
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

  async main(params){
    let options = {
      url: 'https://andela.instructure.com/api/v1/courses/'+params,
      data: {
        per_page: 100
      }
    };


   return await this.promiseResolve(options)
}

  async getList(req,res){

    const data = await this.main(req.body.courseId+'/users')
    this.getEngineerSubmissionsHist(req)
    res.send (data)

    }

    getSpecficCohort(cohortNum){

    }

    async getEngineerSubmissionsHist(req){
      var thi_s =this;
      
      const io = req.app.get('socket_io')

      var data ={}
      //var courseId = req.body.courseId

      // get the course id and fetch all of the assignments
      const assignms = await this.main('219/assignments')
      console.log(assignms.length)
      var assName;

     for (var l in assignms){

       (async function (t){
        //assName = assignms[t].name;
        await thi_s.main('219/assignments/'+assignms[t].id+'/submissions').then((submsns)=>{

        for (var index in submsns){
          (function (i){
          data[submsns[i].user_id] ={}
          data[submsns[i].user_id].assignName = assignms[t].name
          data[submsns[i].user_id].numofsub = submsns[index].attempt
          data[submsns[i].user_id].score = submsns[index].score
      
          if(l == assignms.length -1  && i == submsns.length - 1 ){
            io.emit('full_data',data)
          }

          })(index)}


      })
    } )(l)}
  }
    
}

export default CanvasControler