using AutoMapper;
using BelakorGamesAPI.Infrastructure.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Infrastructure.Config
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Producto, ViewModelProducto>().ReverseMap();
            CreateMap<Usuario, ViewModelUsuario>().ReverseMap();
            CreateMap<Categorium, ViewModelCategoria>().ReverseMap();
            CreateMap<Pedido, ViewModelPedido>().ReverseMap();
            CreateMap<Valoracion, ViewModelValoracion>().ReverseMap();
            CreateMap<ListaDeseo, ViewModelListaDeseos>().ReverseMap();
            CreateMap<DetallePedido, ViewModelDetallePedido>().ReverseMap();
        }
    }
}
