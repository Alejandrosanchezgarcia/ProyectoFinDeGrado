using AutoMapper;
using BelakorGamesAPI.Infrastructure.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Services
{
    public class ListaDeseosService
    {
        private readonly IMapper _mapper;
        private belakorgamesContext context;

        public ListaDeseosService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public List<ViewModelListaDeseos> GetAll()
        {
            List<ViewModelListaDeseos> viewModelListaDeseos = new List<ViewModelListaDeseos>();
            List<ListaDeseo> ListDeseos = new List<ListaDeseo>();
            context = new belakorgamesContext();
            ListDeseos = context.ListaDeseos.ToList();
            viewModelListaDeseos = _mapper.Map<List<ViewModelListaDeseos>>(ListDeseos);
            return viewModelListaDeseos;
        }

        public ViewModelListaDeseos GetByProductoYUsuario(int idProducto, int idUsuario)
        {
            ListaDeseo listaDeseo = new ListaDeseo();
            context = new belakorgamesContext();

            listaDeseo = context.ListaDeseos.Where(x => x.IdProducto == idProducto && x.IdUsuario == idUsuario).FirstOrDefault();
            //linQ = hace busqueda como Querys

            ViewModelListaDeseos viewModelListaDeseo = _mapper.Map<ViewModelListaDeseos>(listaDeseo);

            return viewModelListaDeseo;

        }

        public ViewModelListaDeseos Add(ViewModelListaDeseos viewModelListaDeseos)
        {

            context = new belakorgamesContext();
            ListaDeseo listaDeseo = _mapper.Map<ListaDeseo>(viewModelListaDeseos);
            context.Add(listaDeseo);
            context.SaveChanges();
            return viewModelListaDeseos;
        }

        public Boolean delete(int idUsuario, int idProducto)
        {

            ListaDeseo Lista = new ListaDeseo();
            context = new belakorgamesContext();

            Lista = context.ListaDeseos.Where(x => x.IdUsuario == idUsuario && x.IdProducto == idProducto).FirstOrDefault();
            //linQ = hace busqueda como Querys

            context.Remove(Lista);
            context.SaveChanges();
            return true;
        }

    }
}
