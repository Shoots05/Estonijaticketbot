const e=require('express');const s=e();s.all('/', (req, res)=>{res.setHeader('Content-Type', 'text/html'); res.send(``); res.end();});function k(){s.listen(3000, ()=>{console.log("24/7 Keepalive Server is online! Make sure to add the Replit.co URL to an Uptimer System")});}module.exports=k;