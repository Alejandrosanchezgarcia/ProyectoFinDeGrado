using AutoMapper;
using BelakorGamesAPI.Infrastructure.Classes;
using BelakorGamesAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private CategoriaService cs;
        public CategoriaController(IMapper mapper)
        {
            _mapper = mapper;
            cs = new CategoriaService(_mapper);

        }
        [HttpGet]
        public List<ViewModelCategoria> GetAll()
        {
            return cs.GetAll();

        }
        [HttpGet("{nombreCategoria}")]
        public ViewModelCategoria GetByName(string nombreCategoria)
        {
            return cs.GetByName(nombreCategoria);
        }
        [HttpPost]
        public ViewModelCategoria Add(ViewModelCategoria categoria)
        {
            return cs.Add(categoria);
        }

        [HttpPut("{nombreCategoria}")]
        public ViewModelCategoria updateCategoria(ViewModelCategoria viewModelCat)
        {
            return cs.UpdateCategoria(viewModelCat);
        }
    }
}
