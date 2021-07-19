using AutoMapper;
using BelakorGamesAPI.Infrastructure.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Services
{
    public class CategoriaService
    {
        private readonly IMapper _mapper;
        private belakorgamesContext context;

        public CategoriaService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public List<ViewModelCategoria> GetAll()
        {
            List<ViewModelCategoria> viewModelCat = new List<ViewModelCategoria>();
            List<Categorium> cats = new List<Categorium>();
            context = new belakorgamesContext();
            cats = context.Categoria.ToList();
            viewModelCat = _mapper.Map<List<ViewModelCategoria>>(cats);
            return viewModelCat;
        }

        public ViewModelCategoria GetByName(String nombreCategoria)
        {
            Categorium cat = new Categorium();
            context = new belakorgamesContext();            

            cat = context.Categoria.Where(x => x.NombreCategoria == nombreCategoria ).FirstOrDefault();
            //linQ = hace busqueda como Querys

            ViewModelCategoria viewModelCategoria = _mapper.Map<ViewModelCategoria>(cat);      

            return viewModelCategoria;

        }
        public ViewModelCategoria Add(ViewModelCategoria viewModelCat)
        {

            context = new belakorgamesContext();
            Categorium cat = _mapper.Map<Categorium>(viewModelCat);
            context.Add(cat);
            context.SaveChanges();            
            return viewModelCat;
        }

        public ViewModelCategoria UpdateCategoria(ViewModelCategoria viewModelCat)
        {
            context = new belakorgamesContext();
            Categorium cat = _mapper.Map<Categorium>(viewModelCat);            
            cat = context.Categoria.First(x => x.NombreCategoria == viewModelCat.NombreCategoria);           
            cat.NombreCategoria = viewModelCat.NombreCategoria;
            cat.DescripcionCategoria = viewModelCat.DescripcionCategoria;            
            context.SaveChanges();
            return viewModelCat;

        }
    }
}
