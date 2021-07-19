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
    public class PedidoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private PedidoService ps;
        public PedidoController(IMapper mapper)
        {
            _mapper = mapper;
            ps = new PedidoService(_mapper);

        }
        [HttpGet]
        public List<ViewModelPedido> GetAll()
        {
            return ps.GetAll();

        }

        [HttpGet("{idUsuario}")]
        public ViewModelPedido GetByID(int idUsuario)
        {
            return ps.GetById(idUsuario);
        }

        [HttpPost]
        public ViewModelPedido Add(ViewModelPedido viewModelPedido)
        {
            return ps.Add(viewModelPedido);
        }

        [HttpPut("{idPedido}")]
        public ViewModelPedido updatePedido(ViewModelPedido viewModelpedido)
        {
            return ps.UpdatePedido(viewModelpedido);
        }
    }
}
