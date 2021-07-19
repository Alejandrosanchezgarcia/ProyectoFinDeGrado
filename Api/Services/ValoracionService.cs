using AutoMapper;
using BelakorGamesAPI.Infrastructure.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Services
{
    public class ValoracionService
    {
        private readonly IMapper _mapper;
        private belakorgamesContext context;

        public ValoracionService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public List<ViewModelValoracion> GetAll()
        {
            List<ViewModelValoracion> viewModelVal = new List<ViewModelValoracion>();
            List<Valoracion> valoracion = new List<Valoracion>();
            context = new belakorgamesContext();
            valoracion = context.Valoracions.ToList();
            viewModelVal = _mapper.Map<List<ViewModelValoracion>>(valoracion);
            return viewModelVal;
        }

        public ViewModelValoracion GetByProductoYUsuario(int idProducto, int idUsuario)
        {
            Valoracion valoracion = new Valoracion();
            context = new belakorgamesContext();

             valoracion = context.Valoracions.Where(x => x.IdProducto == idProducto && x.IdUsuario == idUsuario).FirstOrDefault();
            //linQ = hace busqueda como Querys

            ViewModelValoracion viewModelValoracion = _mapper.Map<ViewModelValoracion>(valoracion);

            return viewModelValoracion;

        }

        public ViewModelValoracion Add(ViewModelValoracion viewModelVal)
        {

            context = new belakorgamesContext();
            Valoracion val = _mapper.Map<Valoracion>(viewModelVal);
            context.Add(val);
            context.SaveChanges();
            return viewModelVal;
        }

        public ViewModelValoracion UpdateValoracion(ViewModelValoracion viewModelVal)
        {
            context = new belakorgamesContext();
            Valoracion val = _mapper.Map<Valoracion>(viewModelVal);
            val = context.Valoracions.First(x => x.IdProducto == viewModelVal.IdProducto && x.IdUsuario == viewModelVal.IdUsuario);
            val.IdUsuario = viewModelVal.IdUsuario;
            val.IdProducto = viewModelVal.IdProducto;
            val.Puntuacion = viewModelVal.Puntuacion;
            val.Comentario = viewModelVal.Comentario;
            context.SaveChanges();
            return viewModelVal;

        }
    }
}
