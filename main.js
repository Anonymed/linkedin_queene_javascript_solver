// map=[],document.querySelectorAll('.queens-cell-with-border').forEach(function(e){
//     let _cc = /cell-color-(\d+)/.exec(e.getAttribute('class'))
//     let _c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[_cc[1]];
//     map.push(_c);
// })
// for(let i = Math.sqrt(map.length), j = 1, k = 0; j <= i; j++, k++) map.splice((i*j)+k,0,'\n')s
// console.log(map.join(''))
const map = `AAAAABBCCDD
AAAAAABBCDD
AAAAAAACCED
AAAAAAAAFEE
AAAAAAAAFFE
GAAAAAAAAFF
GGGAAAAAAAA
HGGGAAAAAAA
HHIJJAAAAAA
KHIIJIAAAAA
KKKIIIAAAAA`;
const startAt = Date.now();
const size = map.split('\n').pop().length; // calculate puzzle size
// get colors zones
function zones(){
    z = new Map();
    map.split('').filter(e=>e!='\n').forEach((e, i)=>{
        v = z.get(e) ?? [];
        v.push({index:i,row:Math.floor(i/size),col:i%size});
        z.set(e,v);
    });
    return z;
}
// extract array of array from map string
function matrix(){return map.split('\n').map(r=>r.split(''))}

function draw(_m){
    console.log(_m.map(r=>r.join('\t')).join('\n\n'))
}

// sort zones by surface
let _z = zones();
let _zz = [];
for(let [_color, _area] of _z) {
    console.log(_color)
    let _row = _area[_area.length-1].row - _area[0].row + 1; 
    let [..._copy] = _area; 
    _copy.sort((f,s)=>f.col-s.col);
    let _col = _copy[_copy.length-1].col - _copy[0].col + 1; 
    _zz.push({
        c: _color,
        s: _row*_col
    });
}
let _zzz = _zz.sort((s,e)=>s.s-e.s);
// console.log(_z)

let _m = matrix();
// let _z = zones();
(function(_zz){
 
    for(let i = 0;i < _zz.length ;){
        let z = _zz[i];
        for(let c of _z.get(z.c)){
            if(_m[c.row][c.col] == 'x') {
                _m[c.row][c.col] = z.c
                continue;
            }
            if(_m[c.row].indexOf('x')<0){
                if(_m.map(e=>e[c.col]).indexOf('x')<0){
                    
                    let rb = _m[c.row-1] ?? [];
                    let ra = _m[c.row+1] ?? [];
                    let s_area = [
                        [
                            rb[c.col-1] ?? '_',
                            rb[c.col] ?? '_',
                            rb[c.col+1]  ?? '_'
                        ],
                        [
                            _m[c.row][c.col-1]  ?? '_',
                            _m[c.row][c.col]  ?? '_',
                            _m[c.row][c.col+1] ?? '_'
                        ],
                        [
                            ra[c.col-1] ?? '_',
                            ra[c.col] ?? '_',
                            ra[c.col+1] ?? '_'
                        ]
                    ];
                    // console.log(s_area.map(e=>e.join('\t')).join('\n'),'\n');
                    let surounded = s_area.find(r=>r.indexOf('x')>=0)
                    // console.log('surrounded: ',surounded)
                    if(!surounded){
                        _m[c.row][c.col] = 'x';
                        console.log('checked cell: ', z.c,c.row,c.col)
                        i++; // to go next color
                        break;
                    }
                }    
            }
        } 

        let checked = _z.get(z.c).find(c=>_m[c.row][c.col] == 'x')
        if(!checked) {  
            console.log('im in ', z.c ,' back to ', _zz[i-1].c)
            i--;
        }
        if(_m.filter(a=>a.indexOf('x')>=0).length == size) break;
    } 

})(_zzz)

console.log(_m.filter(a=>a.indexOf('x')>=0).length)
draw(_m)
console.log('Took', Date.now() - startAt, 'ms')
