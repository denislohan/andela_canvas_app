
import bareCanvas from 'canvas-api'


class CanvasControler{

  constructor(){
    this.promiseResolve = this.promiseResolve.bind(this);
    this.getList = this.getList.bind(this);
  
  }

  promiseResolve(options){
    return new Promise(resolve => {
      bareCanvas.helpers.getAllResources(options,(err,result)=>{
        resolve(err?err:result)
      // api.on(event, response => resolve(response));
    });
  })
  }

  async main(params,fromACourse=true){
    let options = {
      url: `https://andela.instructure.com/api/v1/${fromACourse?'courses/':''}${params}`,
      data: {
        per_page: 100
      }
    };


   return await this.promiseResolve(options)
}

  async getList(req,res){
    const data = await this.main(req.body.courseId+'/users')
    if(!data && data.Error) 
      return res.send (data)
    this.getEngineerSubmissionsHist(req,res,true)
    res.send(data)
    }

    async getEngineerSubmissionsHist(req,res,ioEmit){
      var thi_s =this; 
      const io = req.app.get('socket_io')
      let data ={}
      data.index = 1

      let allData = []
      const assignms = await this.main(`${req.body.courseId}/assignments`)
      if(Array.isArray(assignms))
      await Promise.all(assignms.map(el=>{

        return new Promise((resolve,reject) =>{

          if(el.published && el.name.split(':')[1] && el.name.indexOf('Assignment') < 0)
            thi_s.main(`${req.body.courseId}/assignments/`+el.id+`/submissions`)
              .then((submsns)=>{
                for (var index in submsns){
                    (function (i){
                      data[submsns[i].user_id] ={}
                      data[submsns[i].user_id].assignName = el.name
                      data[submsns[i].user_id].numofsub = submsns[index].attempt
                      data[submsns[i].user_id].submittedAt = submsns[index].submitted_at
                      data[submsns[i].user_id].score = submsns[index].score
                      data[submsns[i].user_id].isLate = submsns[index].late
                      data[submsns[i].user_id].due_date = submsns[index].cached_due_date

                    })(index)
                }
              if (ioEmit) io.emit('full_data',data)
              data.index ++ 
              resolve()
            })

        })


    }))
    return allData
  }
    
}

export default CanvasControler