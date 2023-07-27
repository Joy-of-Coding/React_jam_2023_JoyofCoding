// export class InputButton {

//     constructor() {
//         this.keys = [];
//         window.addEventListener('keydown', e => {
//             console.log(e.key, this.keys);
//             if ((   e.key === 'ArrowDown' || 
//                     e.key === 'ArrowUp'  ||
//                     e.key === 'ArrowLeft' ||
//                     e.key === 'ArrowRight' ||
//                     e.key === 'Enter'
//                 ) && this.keys.indexOf(e.key) === -1){
//                 this.keys.push(e.key);
//             }
//         });
//         window.addEventListener('keyup', e => {
//           if(   e.key === 'ArrowDown' || 
//                 e.key === 'ArrowUp'){
//             this.keys.splice(this.keys.indexOf(e.key), 1);
//             }
//             console.log(e.key, this.keys);
//         });
//     }
// }
	