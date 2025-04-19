using Microsoft.AspNetCore.Mvc;
using EnglishLearning.API.Models;
using EnglishLearning.API.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EnglishLearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VocabularyController : ControllerBase
    {
        private readonly IVocabularyService _vocabularyService;

        public VocabularyController(IVocabularyService vocabularyService)
        {
            _vocabularyService = vocabularyService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vocabulary>>> GetAllVocabulary()
        {
            var vocabularyList = await _vocabularyService.GetAllVocabularyAsync();
            return Ok(vocabularyList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vocabulary>> GetVocabularyById(int id)
        {
            var vocabulary = await _vocabularyService.GetVocabularyByIdAsync(id);
            if (vocabulary == null)
            {
                return NotFound();
            }
            return Ok(vocabulary);
        }

        [HttpPost]
        public async Task<ActionResult<Vocabulary>> CreateVocabulary(Vocabulary vocabulary)
        {
            var createdVocabulary = await _vocabularyService.CreateVocabularyAsync(vocabulary);
            return CreatedAtAction(nameof(GetVocabularyById), new { id = createdVocabulary.Id }, createdVocabulary);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVocabulary(int id, Vocabulary vocabulary)
        {
            if (id != vocabulary.Id)
            {
                return BadRequest();
            }

            await _vocabularyService.UpdateVocabularyAsync(vocabulary);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVocabulary(int id)
        {
            await _vocabularyService.DeleteVocabularyAsync(id);
            return NoContent();
        }
    }
}