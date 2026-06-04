package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsJsDocExportTag(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJS: true
// @checkJs: true
// @Filename: /b.ts
export interface A { }

// @Filename: /a.js
/**
 * @export { [|A/**/|] } from "./b";
 */

// @Filename: /c.ts
import { [|A|] } from "./a";
let a: [|A|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyBaselineFindAllReferences(t, "")
}
