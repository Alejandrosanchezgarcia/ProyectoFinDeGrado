using AutoMapper;
using BelakorGamesAPI.Infrastructure.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Services
{
    public class DetallePedidoService
    {
        private readonly IMapper _mapper;
        private belakorgamesContext context;

        public DetallePedidoService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public List<ViewModelDetallePedido> GetAll()
        {
            List<ViewModelDetallePedido> viewModelDetallePedido = new List<ViewModelDetallePedido>();
            List<DetallePedido> detallePedido = new List<DetallePedido>();
            context = new belakorgamesContext();
            detallePedido = context.DetallePedidos.ToList();
            viewModelDetallePedido = _mapper.Map<List<ViewModelDetallePedido>>(detallePedido);
            return viewModelDetallePedido;
        }

        public List<ViewModelDetallePedido> GetByPedido(int idPedido)
        {
            List<DetallePedido> detallePedido = new List<DetallePedido>();
            context = new belakorgamesContext();

            detallePedido = context.DetallePedidos.Where(x => x.IdPedido == idPedido).ToList();
            //linQ = hace busqueda como Querys

            List<ViewModelDetallePedido> viewModelDetallePedido = _mapper.Map<List<ViewModelDetallePedido>>(detallePedido);

            return viewModelDetallePedido;

        }

        public ViewModelDetallePedido Add(ViewModelDetallePedido viewModelDetallePedido)
        {

            context = new belakorgamesContext();
            DetallePedido detallePedido = _mapper.Map<DetallePedido>(viewModelDetallePedido);
            context.Add(detallePedido);
            context.SaveChanges();
            return viewModelDetallePedido;
        }

        public Boolean delete(int idPedido, int idProducto)
        {

            DetallePedido detalle = new DetallePedido();
            context = new belakorgamesContext();

            detalle = context.DetallePedidos.Where(x => x.IdPedido == idPedido && x.IdProducto == idProducto).FirstOrDefault();
            //linQ = hace busqueda como Querys

            context.Remove(detalle);
            context.SaveChanges();
            return true;
        }
        public ViewModelDetallePedido UpadateDetalle(ViewModelDetallePedido viewModelDetalle)
        {
            context = new belakorgamesContext();
            DetallePedido detalle = _mapper.Map<DetallePedido>(viewModelDetalle);
            detalle = context.DetallePedidos.First(x => x.IdPedido == viewModelDetalle.IdPedido && x.IdProducto == viewModelDetalle.IdProducto);
            detalle.IdPedido = viewModelDetalle.IdPedido;
            detalle.IdProducto = viewModelDetalle.IdProducto;
            detalle.Cantidad = viewModelDetalle.Cantidad;
            detalle.Devuelto = viewModelDetalle.Devuelto;            
            context.SaveChanges();
            return viewModelDetalle;

        }
    }
}
