const assert = require('assert')
const NakoCompiler = require('../src/nako3')

describe('PluginSystem test', () => {
  const nako = new NakoCompiler()
    // nako.debug = true;
  const cmp = (code, res) => {
    if (nako.debug) {
      console.log('code=' + code)
    }
    assert.equal(nako.runReset(code).log, res)
  }
    // --- test ---
  it('ナデシコエンジンを表示', () => {
    cmp('ナデシコエンジンを表示', 'nadesi.com/v3')
  })
  it('四則演算', () => {
    cmp('1に2を足して3を掛けて表示', '9')
    cmp('10を2で割って表示', '5')
    cmp('10を2で割った余り;それを表示', '0')
  })
  it('JS実行', () => {
    cmp('「3+6」をJS実行して表示', '9')
    cmp('「Math.floor(3.5)」をJS実行して表示', '3')
  })
  it('型変換', () => {
    cmp('「3.14」を文字列変換して表示', '3.14')
    cmp('「0xFF」を整数変換して表示', '255')
  })
  it('変数型確認', () => {
    cmp('30の変数型確認して表示。', 'number')
  })
  it('SIN/COS/TAN', () => {
    cmp('SIN(1)を表示。', Math.sin(1))
    cmp('COS(1)を表示。', Math.cos(1))
    cmp('TAN(1)を表示。', Math.tan(1))
  })
  it('RGB', () => {
    cmp('RGB(255,255,0)を表示。', '#ffff00')
  })
  it('LOGN', () => {
    cmp('LOGN(10,10)を表示。', Math.LOG10E * Math.log(10))
    cmp('LOGN(2,10)を表示。', Math.LOG2E * Math.log(10))
  })
  it('文字挿入', () => {
    cmp('「12345」の2に「**」を文字挿入して表示', '1**2345')
    cmp('「12345」の1に「**」を文字挿入して表示', '**12345')
    cmp('「12345」の6に「**」を文字挿入して表示', '12345**')
    cmp('「12345」の0に「**」を文字挿入して表示', '**12345')
  })
  it('出現回数', () => {
    cmp('「aabbccaabbcc」で「aa」の出現回数。表示', '2')
    cmp('「aa**bb**cc」で「**」の出現回数。表示', '2')
    cmp('「aa.+bb.+cc」で「.+」の出現回数。表示', '2')
  })
  it('シングル文字列', () => {
    cmp("'abcd'を表示。", 'abcd')
  })
  it('文字抜き出す', () => {
    cmp("MID('abcdef',1,2)を表示", 'ab')
    cmp("MID('abcdefg',3,2)を表示", 'cd')
    cmp("MID('abcd',4,2)を表示", 'd')
  })
  it('RIGHT', () => {
    cmp("RIGHT('abcdef',2)を表示", 'ef')
    cmp('「abcde」の3だけ文字右部分。それを表示', 'cde')
  })
  it('LEFT', () => {
    cmp("LEFT('abcd',2)を表示", 'ab')
    cmp('「abcde」の3だけ文字左部分。それを表示', 'abc')
  })
  it('切り取る', () => {
    cmp('「abc,def,ghi」から「,」まで切り取る。それを表示。', 'abc')
    cmp('「a,b,c」から「*」まで切り取る。それを表示。', 'a,b,c')
  })
  it('文字削除', () => {
    cmp('「abcd」の1から2だけ文字削除。それを表示。', 'cd')
    cmp('「abcd」の2から2だけ文字削除。それを表示。', 'ad')
  })
  it('置換', () => {
    cmp('「a,b,c」の「,」を「-」に置換して表示。', 'a-b-c')
    cmp('「e,f,g」の「,」を「-」へ単置換して表示。', 'e-f,g')
  })
  it('空白除去', () => {
    cmp('「  aaa   」の空白除去して表示。', 'aaa')
  })
  it('四捨五入', () => {
    cmp('6を四捨五入して表示。', '10')
    cmp('13を四捨五入して表示。', '10')
    cmp('14を四捨五入して表示。', '10')
    cmp('39を四捨五入して表示。', '40')
    cmp('35を四捨五入して表示。', '40')
  })
  it('正規表現置換', () => {
    cmp('「aa,bb,cc」の「[a-z]+」を「x」で正規表現置換して表示。', 'x,x,x')
    cmp('「aa,bb,cc」の「/[a-z]+/」を「x」で正規表現置換して表示。', 'x,bb,cc')
    cmp('「aa,bb,cc」の「/[a-z]+/g」を「x」で正規表現置換して表示。', 'x,x,x')
  })
  it('正規表現マッチ - /.../を省略', () => {
        // パターンを省略するとグローバルマッチ
    cmp('「aa,bb,cc」を「[a-z]+」で正規表現マッチ。JSONエンコード。表示。', '["aa","bb","cc"]')
        // グループを指定しても、結果は無視
    cmp('「aa,bb,cc」を「([a-z]+)」で正規表現マッチ。JSONエンコード。表示。', '["aa","bb","cc"]')
  })
  it('正規表現マッチ - /.../あり グルーピングなし', () => {
    cmp('「12-34-56」を「/[0-9]+\\-/」で正規表現マッチ。JSONエンコード。表示。', '"12-"')
  })
  it('正規表現マッチ - /.../あり グルーピングあり', () => {
        // グループ(..)を指定した場合
    cmp('「12-34-56」を「/([0-9]+)\\-/」で正規表現マッチ。JSONエンコード。表示。抽出文字列をJSONエンコードして表示。', '"12-"\n["12"]')
  })
  it('正規表現マッチ2', () => {
    cmp('「AA,BB,CC」を「/^[a-z]+/i」で正規表現マッチ。表示。', 'AA')
  })
  it('正規表現区切る', () => {
    cmp('「aa,bb,cc」を「/\\,/g」で正規表現区切る。JSONエンコード。表示。', '["aa","bb","cc"]')
  })
  it('通貨形式', () => {
    cmp('12345を通貨形式。表示。', '12,345')
    cmp('1000を通貨形式。表示。', '1,000')
  })
  it('ゼロ埋め', () => {
    cmp('10を3でゼロ埋め。表示。', '010')
    cmp('123を5でゼロ埋め。表示。', '00123')
    cmp('12345を3でゼロ埋め。表示。', '12345')
  })
  it('配列要素数', () => {
    cmp('A=[0,1,2,3];Aの配列要素数。表示。', '4')
    cmp('A={"a":1,"b":2,"c":3};Aの配列要素数。表示。', '3')
  })
  it('配列一括挿入', () => {
    cmp('A=[1,1,1];Aの1に[0,0]を配列一括挿入。JSONエンコード。表示。', '[1,0,0,1,1]')
  })
  it('配列ソート', () => {
    cmp("A=['ccc','bb','aaa'];Aを配列ソート。Aを「:」で配列結合。表示。", 'aaa:bb:ccc')
  })
  it('配列数値ソート', () => {
    cmp("A=['a',1,3,2];Aを配列数値ソート。Aを「:」で配列結合。表示。", 'a:1:2:3')
    cmp("A=['30','222','55'];Aを配列数値ソート。Aを「:」で配列結合。表示。", '30:55:222')
  })
  it('配列カスタムソート', () => {
    cmp('●HOGE(aをbで)\n(b-a)を戻す\n---\n' +
            'A=[1,5,3];Aを「HOGE」で配列カスタムソート。Aを「:」で配列結合。表示。', '5:3:1')
  })
  it('配列逆順', () => {
    cmp('A=[1,2,3];Aを配列逆順。Aを「:」で配列結合。表示。', '3:2:1')
  })
  it('配列切り取', () => {
    cmp('A=[0,1,2,3];Aの2を配列切り取る。C=それ。Aを「:」で配列結合。表示。Cを表示', '0:1:3\n2')
  })
  it('日時', () => {
    cmp('「2017/03/06」の曜日。それを表示', '月')
    cmp('「2017/03/06 00:00:00」をUNIXTIME変換して表示', '1488726000')
    cmp('「2017/03/06 00:00:01」をUNIXTIME変換して表示', '1488726001')
    cmp('1488726000を日時変換して表示', '2017/03/06 00:00:00')
  })
  it('文字種変換', () => {
    cmp('「abc」を大文字変換して表示', 'ABC')
    cmp('「ABC」を小文字変換して表示', 'abc')
    cmp('「アイウ」を平仮名変換して表示', 'あいう')
    cmp('「あいう」をカタカナ変換して表示', 'アイウ')
  })
})
