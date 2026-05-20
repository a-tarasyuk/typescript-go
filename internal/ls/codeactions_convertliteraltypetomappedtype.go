package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls/change"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

const convertLiteralTypeToMappedTypeFixID = "convertLiteralTypeToMappedType"

var convertLiteralTypeToMappedTypeErrorCodes = []int32{
	diagnostics.X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Did_you_mean_to_use_1_in_0.Code(),
}

var ConvertLiteralTypeToMappedTypeProvider = &CodeFixProvider{
	ErrorCodes:        convertLiteralTypeToMappedTypeErrorCodes,
	GetCodeActions:    getCodeActionsToConvertLiteralTypeToMappedType,
	FixIds:            []string{convertLiteralTypeToMappedTypeFixID},
	GetAllCodeActions: getAllCodeActionsToConvertLiteralTypeToMappedType,
}

type convertLiteralTypeToMappedTypeInfo struct {
	container  *ast.Node
	typeNode   *ast.Node
	constraint string
	name       string
}

type convertLiteralTypeToMappedTypeFixer struct {
	sourceFile    *ast.SourceFile
	changeTracker *change.Tracker
}

func getCodeActionsToConvertLiteralTypeToMappedType(ctx context.Context, fixContext *CodeFixContext) ([]*CodeAction, error) {
	f := newConvertLiteralTypeToMappedTypeFixer(ctx, fixContext)
	info := f.getInfo(fixContext.Span.Pos())
	if info == nil {
		return nil, nil
	}

	f.doChange(info)
	changes := f.getChanges()
	if len(changes) == 0 {
		return nil, nil
	}

	locale := locale.FromContext(ctx)
	return []*CodeAction{{
		Description:       diagnostics.Convert_0_to_1_in_0.Localize(locale, info.constraint, info.name),
		Changes:           changes,
		FixID:             convertLiteralTypeToMappedTypeFixID,
		FixAllDescription: diagnostics.Convert_all_type_literals_to_mapped_type.Localize(locale),
	}}, nil
}

func getAllCodeActionsToConvertLiteralTypeToMappedType(ctx context.Context, fixContext *CodeFixContext) (*CombinedCodeActions, error) {
	f := newConvertLiteralTypeToMappedTypeFixer(ctx, fixContext)

	for _, diag := range getAllDiagnostics(ctx, fixContext.Program, fixContext.SourceFile) {
		if containsErrorCode(convertLiteralTypeToMappedTypeErrorCodes, diag.Code()) {
			info := f.getInfo(diag.Pos())
			if info == nil {
				continue
			}
			f.doChange(info)
		}
	}

	changes := f.getChanges()
	if len(changes) == 0 {
		return nil, nil
	}

	return &CombinedCodeActions{
		Description: diagnostics.Convert_all_type_literals_to_mapped_type.Localize(locale.FromContext(ctx)),
		Changes:     changes,
	}, nil
}

func newConvertLiteralTypeToMappedTypeFixer(ctx context.Context, fixContext *CodeFixContext) *convertLiteralTypeToMappedTypeFixer {
	return &convertLiteralTypeToMappedTypeFixer{
		sourceFile:    fixContext.SourceFile,
		changeTracker: change.NewTracker(ctx, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters),
	}
}

func (f *convertLiteralTypeToMappedTypeFixer) getChanges() []*lsproto.TextEdit {
	return f.changeTracker.GetChanges()[f.sourceFile.FileName()]
}

func (f *convertLiteralTypeToMappedTypeFixer) getInfo(pos int) *convertLiteralTypeToMappedTypeInfo {
	token := astnav.GetTokenAtPosition(f.sourceFile, pos)
	if token == nil {
		return nil
	}

	if ast.IsIdentifier(token) {
		propertySignature := token.Parent
		if ast.IsComputedPropertyName(propertySignature) {
			propertySignature = propertySignature.Parent
		}
		if propertySignature == nil {
			return nil
		}

		if ast.IsPropertySignatureDeclaration(propertySignature) {
			container := propertySignature.Parent
			if container == nil {
				return nil
			}

			if ast.IsTypeLiteralNode(container) {
				propertyName := token.Text()
				return &convertLiteralTypeToMappedTypeInfo{
					container:  container,
					typeNode:   propertySignature.Type(),
					constraint: propertyName,
					name:       core.IfElse(propertyName == "K", "P", "K"),
				}
			}
		}
	}

	return nil
}

func (f *convertLiteralTypeToMappedTypeFixer) doChange(info *convertLiteralTypeToMappedTypeInfo) {
	factory := f.changeTracker.NodeFactory
	mappedType := factory.NewMappedTypeNode(nil /*readonlyToken*/, factory.NewTypeParameterDeclaration(nil /*modifiers*/, factory.NewIdentifier(info.name), factory.NewTypeReferenceNode(factory.NewIdentifier(info.constraint), nil /*typeArguments*/), nil /*expression*/, nil /*defaultType*/), nil /*nameType*/, nil /*questionToken*/, factory.DeepCloneNode(info.typeNode), nil /*members*/)
	f.changeTracker.ReplaceNode(f.sourceFile, info.container, mappedType, nil /*options*/)
}
