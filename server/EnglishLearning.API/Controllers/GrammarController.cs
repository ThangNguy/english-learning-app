using Microsoft.AspNetCore.Mvc;
using EnglishLearning.API.Services;
using System.Threading.Tasks;

namespace EnglishLearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrammarController : ControllerBase
    {
        private readonly IGrammarService _grammarService;

        public GrammarController(IGrammarService grammarService)
        {
            _grammarService = grammarService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGrammarTopics()
        {
            var topics = await _grammarService.GetAllGrammarTopicsAsync();
            return Ok(topics);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGrammarTopicById(int id)
        {
            var topic = await _grammarService.GetGrammarTopicByIdAsync(id);
            if (topic == null)
            {
                return NotFound();
            }
            return Ok(topic);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGrammarTopic([FromBody] GrammarTopicDto grammarTopicDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdTopic = await _grammarService.CreateGrammarTopicAsync(grammarTopicDto);
            return CreatedAtAction(nameof(GetGrammarTopicById), new { id = createdTopic.Id }, createdTopic);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGrammarTopic(int id, [FromBody] GrammarTopicDto grammarTopicDto)
        {
            if (id != grammarTopicDto.Id || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var updatedTopic = await _grammarService.UpdateGrammarTopicAsync(grammarTopicDto);
            if (updatedTopic == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrammarTopic(int id)
        {
            var result = await _grammarService.DeleteGrammarTopicAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}