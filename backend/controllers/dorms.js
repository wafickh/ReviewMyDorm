const dorm = require('../models/dorm')
const school = require('../models/school')
const cloudinary = require("../cloudinary/index");
const user = require('../models/user');
const review = require('../models/review');

module.exports.CreateDorm = async (req, res) => {
    const { Name, contractInformation, images, ContactUs, Coordinates, Schools, Author } = req.body;
    try {
        if (images) {
            const uploadedResponse = await cloudinary.uploader.upload(images, {
                upload_preset: "Dorms",
            });
            const Dorm = new dorm({
                Name,
                contractInformation,
                images: uploadedResponse.url,
                ContactUs,
                Coordinates,
                Schools,
                Author
            });
            let uso = await user.findById(Author);
            uso.Dorms?.push(Dorm);
            Dorm.Schools.map(async (value, key) => {

                let sch = await school.findById(value._id);
               
                sch.Dorms.push(Dorm);
                const savee = await sch.save();
            })
            const sv = await uso.save();
            const saveDorm = await Dorm.save();
            res.status(201).json(saveDorm);
        }

    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

module.exports.getDorm = async (req, res, next) => {
    try {
        const Dorm = await dorm.findById(req.params.id).populate('Schools').populate({
           path: 'Reviews',
            populate:{
                path:'User'
            }
        }).populate('Author');
        res.status(200).json(Dorm);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

module.exports.getAllDorms = async (req, res) => {
    try {
        const schoolss=await school.find({}).populate('Dorms')
        let app=[];
        schoolss.map((value)=>{
            value.Dorms.map((va)=>{
                if(va.approved===false){
                  //  console.log(va)
                    app.push(va)
                }
            })
        })
        res.status(200).json(app);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

module.exports.UpdateDorm = async (req, res, next) => {
    try {
        const UpdateDorm = await dorm.findByIdAndUpdate(
            req.params.id,
            { $set: { approved: 'true' } },
            { new: true }
        );
        res.status(200).json(UpdateDorm);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}
    
module.exports.DeleteDorm = async (req, res, next) => {
    try {
        const {schoolid,  dormid,userid } = req.params;
        await school.findByIdAndUpdate(schoolid, { $pull: { Dorms: dormid } });
        await user.findByIdAndUpdate(userid, { $pull: { Dorms: dormid } });
        let dormii=await dorm.findById(dormid);
        dormii.Reviews.map((value)=>{1
            let rev= review.findByIdAndDelete(value._id)
        })
        const dormi = await dorm.findByIdAndDelete(dormid);
        res.status(200).json("Dorm has been deleted");
    } catch (err) {
        res.status(409).json({ message: err.message })
    }

}

