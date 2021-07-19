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
    public class DetallePedidoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private DetallePedidoService dps;
        public DetallePedidoController(IMapper mapper)
        {
            _mapper = mapper;
            dps = new DetallePedidoService(_mapper);

        }

        [HttpGet]
        public List<ViewModelDetallePedido> GetAll()
        {
            return dps.GetAll();

        }

        [HttpGet("{idPedido}")]
        public List<ViewModelDetallePedido> GetByProductoYPedido(int idPedido)
        {
            return dps.GetByPedido(idPedido);
        }

        [HttpPost]
        public ViewModelDetallePedido Add(ViewModelDetallePedido pedido)
        {
            return dps.Add(pedido);
        }

        [HttpDelete("{idPedido, idProducto}")]
        public bool Delete(int idPedido, int idProducto)
        {
            return dps.delete(idPedido, idProducto);
        }
        [HttpPut("{idProducto, idPedido}")]
        public ViewModelDetallePedido ResponseUpadateDetalle(ViewModelDetallePedido viewModelDetalle)
        {
            return dps.UpadateDetalle(viewModelDetalle);
        }
    }
}
