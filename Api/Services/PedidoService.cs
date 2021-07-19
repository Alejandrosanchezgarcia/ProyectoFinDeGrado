using AutoMapper;
using BelakorGamesAPI.Infrastructure.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Services
{
    public class PedidoService
    {
        private readonly IMapper _mapper;
        private belakorgamesContext context;

        public PedidoService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public List<ViewModelPedido> GetAll()
        {
            List<ViewModelPedido> viewModelPedido = new List<ViewModelPedido>();
            List<Pedido> pedidos = new List<Pedido>();
            context = new belakorgamesContext();
            pedidos = context.Pedidos.ToList();
            viewModelPedido = _mapper.Map<List<ViewModelPedido>>(pedidos);
            return viewModelPedido;
        }

        public ViewModelPedido GetById(int idUsuario)
        {
            Pedido pedido = new Pedido();
            context = new belakorgamesContext();

            pedido = context.Pedidos.Where(x => x.IdUsuario == idUsuario).ToList().Last();
            //linQ = hace busqueda como Querys

            ViewModelPedido viewModelPedido = _mapper.Map<ViewModelPedido>(pedido);
            
            return viewModelPedido;

        }

        public ViewModelPedido Add(ViewModelPedido viewModelPedido)
        {

            context = new belakorgamesContext();
            Pedido pedido = _mapper.Map<Pedido>(viewModelPedido);
            context.Add(pedido);
            context.SaveChanges();
            return viewModelPedido;
        }

        public ViewModelPedido UpdatePedido(ViewModelPedido viewModelPedido)
        {
            context = new belakorgamesContext();
            Pedido pedido = _mapper.Map<Pedido>(viewModelPedido);
            pedido = context.Pedidos.First(x => x.IdPedido == viewModelPedido.IdPedido);            
            pedido.Comprado = viewModelPedido.Comprado;
            pedido.Fecha = viewModelPedido.Fecha;
            pedido.IdUsuario = viewModelPedido.IdUsuario;
            context.SaveChanges();
            return viewModelPedido;

        }
    }
}
