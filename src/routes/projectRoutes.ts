import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController"
import { handleInputErrors } from "../middleware/validation"
import { noteIdValidator, noteValidator, projectValidations, validationsId, validationsProjectId } from "../validators/projectValidations"
import { TaskController } from "../controllers/TaskController"
import { ProjectExists } from "../middleware/project"
import { statusValidation, taskValidations, validationsTaskId } from "../validators/taskValidation"
import { hasAuthorization, taskBelongsToProject, TaskExists } from "../middleware/task"
import { authenticate } from "../middleware/auth"
import { validationIdTeam, validationTeam, validEmailTeam } from "../validators/authValidations"
import { TeamMemberController } from "../controllers/TeamController"
import { NoteController } from "../controllers/NoteController"

const router = Router()

router.use(authenticate)
router.post('/', 
     projectValidations,
     handleInputErrors, 
     ProjectController.createProject
)

router.get('/', 
     ProjectController.getAllProjects
)

router.get('/:id', 
     validationsId, 
     handleInputErrors, 
     ProjectController.getProjectById
)


/** Routes for Task */
router.param('projectId', ProjectExists)

router.put('/:projectId', 
     validationsProjectId, 
     projectValidations, 
     handleInputErrors, 
     hasAuthorization,
     ProjectController.updateProject
)

router.delete('/:projectId',
     validationsProjectId, 
     handleInputErrors, 
     hasAuthorization,
     ProjectController.deleteProject
)

router.post('/:projectId/tasks',
     hasAuthorization,
     taskValidations,
     TaskController.createTask
)

router.get('/:projectId/tasks',
     TaskController.getProjectTasks
)

router.param('taskId', TaskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId', 
     validationsTaskId,
     handleInputErrors,
     TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId', 
     hasAuthorization,
     validationsTaskId,
     taskValidations,
     handleInputErrors,
     TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
     hasAuthorization, 
     validationsTaskId,
     handleInputErrors,
     TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status', 
     validationsTaskId,
     statusValidation,
     handleInputErrors,
     TaskController.updateStatus
)

/** Routes for teams */
router.post('/:projectId/team/find',
     validEmailTeam,
     handleInputErrors,
     TeamMemberController.findMemberByEmail
)

router.post('/:projectId/team', 
     validationIdTeam,
     handleInputErrors,
     TeamMemberController.addMemberById
)

router.delete('/:projectId/team/:userId', 
     validationTeam,
     handleInputErrors,
     TeamMemberController.removeMemberById
)

router.get('/:projectId/team', 
     TeamMemberController.getProjectTeam
)

/** Routes for Notes */
router.post('/:projectId/tasks/:taskId/notes',
     noteValidator,
     handleInputErrors,
     NoteController.createNote
)

router.get('/:projectId/tasks/:taskId/notes',
     NoteController.getTaskNotes
)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
     noteIdValidator,
     handleInputErrors,
     NoteController.deleteNote
)

export default router