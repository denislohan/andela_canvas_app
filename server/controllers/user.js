import parser from 'properties-parser'

class User{

registerOrLogin(req,res){

    if(req.body.pass){
        parser.read('static/users.properties', (err,result)=>{

            console.log(result)
            for (var key in result){
                console.log(key)
                if(req.body.pass == result[key]){

                    res.send({
                        LF:key.split('-')[0]})
                        return;
                }

            }
        res.json({
            error: 'no such LF'
        })

        });
    }

 
    else{

        parser.createEditor('static/users.properties',async (err,editor)=>{
            var keys = Object.keys(req.body)
            console.log(req.body['denis-password'])


            for(var index in keys ){
                await editor.set(keys[index],req.body[keys[index]])

            }
            
            editor.save('static/users.properties',(err,result)=>{
                if (err)
                    res.json({
                        err:err
                    })
                else{
                res.json({
                    feedback:"done"
                })
                }

            })

        })
}

}
}

export default User