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
    public class UsuarioController : ControllerBase
    {
        private readonly IMapper _mapper;
        private UsuarioService us;
        public UsuarioController(IMapper mapper)
        {
            _mapper = mapper;
            us = new UsuarioService(_mapper);

        }
        [HttpGet]
        public List<ViewModelUsuario> GetAll()
        {
            return us.GetAll();

        }

        [HttpGet("{nombreEmail}")]
        public ViewModelUsuario GetByEmail(string nombreEmail)
        {


            return us.GetByEmail(nombreEmail);
           
        }
        [HttpPost]
        public ViewModelUsuario Add(ViewModelUsuario user)
        {
            return us.Add(user);
        }

        [HttpPut("{nombreEmail}")]
        public ViewModelUsuario upadateUsuario([FromBody]ViewModelUsuario viewModelUser)
        {
            return us.UpadateUsuario(viewModelUser);
        }

        [HttpDelete("{IdUsuario}")]
        public bool Delete(int IdUsuario)
        {
            return us.deleteUser(IdUsuario);
        }


    }
}
