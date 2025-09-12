# HOW IT WORKS
first it extract different zones, each zone is represented by a specific color then it start from the smallest zone to the largest one because as you can observe smallest zone have less cells so less options then it use backtrack algorithm to check valid cells 
# WHY USING backtrack with zones
using backtrack with color-based zone reduce algorithm itarations and also calculation because using just backtrack we need to make more validations on colors
# HOW IT WORKS
### 1 - map queeze matrix to array of arrays of colors
<img src="https://towardsdatascience.com/wp-content/uploads/2024/09/1I0U4bZF40MHGbYWLX1ugiQ.png" width=100 height=100 />
would be converted to:

```javascript
const map = `PPPPPPPPOO
PPBGGGGOOW
PBBBGGOOWW
PPBRGOOYYY
PPRROOAAAY
...`;
```

as you see every color is represented by a lettre (dont use * astrix because the script use it internally for marking cells)

NOTE: you can generate map from web console by running the following code but before that you have to be in the game tab

```javascript
map=[],document.querySelectorAll('.queens-cell-with-border').forEach(function(e){
    let _cc = /cell-color-(\d+)/.exec(e.getAttribute('class'))
    let _c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[_cc[1]];
    map.push(_c);
})
for(let i = Math.sqrt(map.length), j = 1, k = 0; j <= i; j++, k++) map.splice((i*j)+k,0,'\n')s
console.log(map.join(''))
```

### 2 - run the script using nodejs or in you navigator
