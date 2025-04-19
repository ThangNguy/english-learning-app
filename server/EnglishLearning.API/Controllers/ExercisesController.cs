using Microsoft.AspNetCore.Mvc;
using EnglishLearning.API.Models;
using EnglishLearning.API.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EnglishLearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;

        public ExercisesController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exercise>>> GetExercises()
        {
            var exercises = await _exerciseService.GetAllExercises();
            return Ok(exercises);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Exercise>> GetExercise(int id)
        {
            var exercise = await _exerciseService.GetExerciseById(id);
            if (exercise == null)
            {
                return NotFound();
            }
            return Ok(exercise);
        }

        [HttpPost]
        public async Task<ActionResult<Exercise>> CreateExercise(Exercise exercise)
        {
            var createdExercise = await _exerciseService.CreateExercise(exercise);
            return CreatedAtAction(nameof(GetExercise), new { id = createdExercise.Id }, createdExercise);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExercise(int id, Exercise exercise)
        {
            if (id != exercise.Id)
            {
                return BadRequest();
            }

            await _exerciseService.UpdateExercise(exercise);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercise(int id)
        {
            var exercise = await _exerciseService.GetExerciseById(id);
            if (exercise == null)
            {
                return NotFound();
            }

            await _exerciseService.DeleteExercise(id);
            return NoContent();
        }
    }
}