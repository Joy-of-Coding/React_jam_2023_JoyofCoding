Rune.initLogic({minPlayers:1,maxPlayers:4,setup:()=>({count:0}),actions:{increment:({amount:e},{game:n})=>{n.count+=e}},events:{playerJoined:()=>{},playerLeft(){}}});
