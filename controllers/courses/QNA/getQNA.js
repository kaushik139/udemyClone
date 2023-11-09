const students = require('../../../models/student');
const chalk = require('chalk')

async function controller(req, res) {
    const QNA = req.body;
    if (QNA.length) {
        try {
            for (let i = 0; i < QNA.length; i++) {
                const id = QNA[i].querry.studentID;
                const student = await students.findOne({ _id: id });
                QNA[i].querry.studentName = student.name;
                QNA[i].querry.studentImg = student.profileImage;
                // console.log(chalk.yellowBright(QNA[i].querry));
                // console.log(chalk.bgRed(id));
                // console.log(student);
                // console.log(QNA);
                if (QNA[i].replies) {
                    for (let j = 0; j < QNA[i].replies.length; j++) {
                        // console.log(QNA[i].replies[j]);
                        const replyStudent = await students.findOne({ _id: QNA[i].replies[j].studentID })
                        // console.log(replyStudent);
                        QNA[i].replies[j].studentName = replyStudent.name;
                        QNA[i].replies[j].profileImage = replyStudent.profileImage;
                    }
                }
            }
            res.status(200).json(QNA);
        } catch (err) {
            console.error(err);
            res.status(500).json('Server Error')
        }
    }
    else res.status(404).json('Not Found');

}

module.exports = { controller }