const assert = require('assert');
const NakoCompiler = require('../src/nako3.js');

describe('calc', ()=>{
  const nako = new NakoCompiler();
  it('もし', ()=> {
    assert.equal(nako.run_reset("もし3>1ならば「あ」と表示。").log, "あ");
    assert.equal(nako.run_reset("もし3<1ならば「あ」と表示。\n"+
      "違えば「い」と表示。").log, "い");
  });
  it('回', ()=> {
    assert.equal(nako.run_reset("3回「あ」と表示。").log, "あ\nあ\nあ");
    assert.equal(nako.run_reset("A=3;(A)回、Aを表示。").log, "3\n3\n3");
  });
});
