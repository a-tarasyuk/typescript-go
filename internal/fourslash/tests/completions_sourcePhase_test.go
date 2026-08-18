package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSourcePhaseImportPathCompletionsIncludeWasm(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @target: esnext

// @filename: /a.wasm
wasm

// @filename: /a.txt
text

// @filename: /a.ts
export {};

// @filename: /b.ts
import source a from ".//*static*/";
import.source(".//*dynamic*/");
import(".//*evaluation*/");`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	for _, marker := range []string{"static", "dynamic"} {
		f.VerifyCompletions(t, marker, &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &[]string{},
				EditRange:        Ignored,
			},
			Items: &fourslash.CompletionsExpectedItems{
				Includes: []fourslash.CompletionsExpectedItem{"a.wasm"},
				Excludes: []string{"a.txt"},
			},
		})
	}

	f.VerifyCompletions(t, "evaluation", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Excludes: []string{"a.wasm", "a.txt"},
		},
	})
}

func TestSourcePhaseImportPackageCompletionsUseRuntimeExportCondition(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @moduleResolution: bundler
// @target: esnext

// @filename: /node_modules/pkg/package.json
{"name":"pkg","exports":{"./*":{"types":"./types/*.d.ts","default":"./wasm/*.wasm"}}}

// @filename: /node_modules/pkg/types/a.d.ts
export {};

// @filename: /node_modules/pkg/wasm/b.wasm
wasm

// @filename: /src/index.ts
import source a from "pkg//*source*/";
import("pkg//*evaluation*/");`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyCompletions(t, "source", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"b"},
			Excludes: []string{"a"},
		},
	})

	f.VerifyCompletions(t, "evaluation", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"a"},
			Excludes: []string{"b"},
		},
	})
}
