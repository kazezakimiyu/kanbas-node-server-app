import db from "../Database/index.js";

function AssignmentRoutes(app) {
    app.get("/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
        .filter((a) => a.course === cid);
        res.send(assignments);
    });
    app.post("/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });
    app.delete("/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });
    app.put("/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
    
        if (assignmentIndex !== -1) {
            db.assignments[assignmentIndex] = {
                ...db.assignments[assignmentIndex],
                ...req.body
            };
            res.sendStatus(204);
        } else {
            res.status(404).send({ message: "Assignment not found" });
        }
    });
}
export default AssignmentRoutes;