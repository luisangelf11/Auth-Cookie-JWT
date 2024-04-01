import app from './app'

//Run server
app.listen(app.get('PORT'), ()=>{
    console.log(`Server listening on port`, app.get('PORT'))
});