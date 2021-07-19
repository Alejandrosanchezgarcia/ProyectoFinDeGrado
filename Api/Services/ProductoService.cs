using AutoMapper;
using BelakorGamesAPI.Infrastructure.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Services
{
    public class ProductoService
    {
        private readonly IMapper _mapper;
        private belakorgamesContext context;

        public ProductoService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public List<ViewModelProducto> GetAll()
        {
            List<ViewModelProducto> viewModelProducto = new List<ViewModelProducto>();
            List<Producto> prod = new List<Producto>();
            context = new belakorgamesContext();
            prod = context.Productos.ToList();
            viewModelProducto = _mapper.Map<List<ViewModelProducto>>(prod);
            return viewModelProducto;
        }

        public ViewModelProducto GetByName(String nombreJuego)
        {
            Producto prod = new Producto();
            context = new belakorgamesContext();

            prod = context.Productos.Where(x => x.NombreProducto == nombreJuego).FirstOrDefault();
            //linQ = hace busqueda como Querys

            ViewModelProducto viewModelProd = _mapper.Map<ViewModelProducto>(prod);

            return viewModelProd;

        }

        public ViewModelProducto UpadateProducto(ViewModelProducto viewModelProd)
        {
            context = new belakorgamesContext();
            Producto prod = _mapper.Map<Producto>(viewModelProd);
            prod = context.Productos.First(x => x.NombreProducto == viewModelProd.NombreProducto);
            //prod.IdProducto = viewModelProd.IdProducto;
            prod.NombreProducto = viewModelProd.NombreProducto;
            prod.Precio = viewModelProd.Precio;
            prod.Stock = viewModelProd.Stock;
            prod.DescripcionProducto = viewModelProd.DescripcionProducto;
            prod.Imagen = viewModelProd.Imagen;
            prod.IdCategoria = viewModelProd.IdCategoria;
            context.SaveChanges();
            return viewModelProd;

        }
        

        public ViewModelProducto Add(ViewModelProducto viewModelProd)
        {
            context = new belakorgamesContext();
            Producto prod = _mapper.Map<Producto>(viewModelProd);
            context.Add(prod);
            context.SaveChanges();
            return viewModelProd;
        }
    }
}
