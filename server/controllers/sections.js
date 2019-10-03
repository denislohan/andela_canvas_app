import Canvas from './engeneers'
const canvas = new Canvas()

  const getSections = async(req,res) => {
    const sections = await canvas.main(req.params.course+'/sections') 
    return res.send(sections);
}

const getUsersBySection = async (req,res) => {
    const {section} = req.params
    let ids = []
    const enrollments = await canvas.main(`sections/${section}/enrollments`,false)
    enrollments.map(enrol=>{
         enrol.type === 'StudentEnrollment' ? ids.push(enrol.user_id): ''
    })
    return res.send(ids);
}

export {getSections,getUsersBySection}