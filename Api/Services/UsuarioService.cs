using AutoMapper;
using BelakorGamesAPI.Infrastructure.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Services
{
    public class UsuarioService
    {
        private readonly IMapper _mapper;
        private belakorgamesContext context;

        public UsuarioService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public List<ViewModelUsuario> GetAll()
        {
            List<ViewModelUsuario> viewModelUsers = new List<ViewModelUsuario>();
            List<Usuario> users = new List<Usuario>();
            context = new belakorgamesContext();
            users = context.Usuarios.ToList();
            viewModelUsers = _mapper.Map<List<ViewModelUsuario>>(users);
            return viewModelUsers;
        }

        public ViewModelUsuario GetByEmail(String nombreEmail)
        {
            Usuario user = new Usuario();
            context = new belakorgamesContext();

            user = context.Usuarios.Where(x => x.Email == nombreEmail).FirstOrDefault();
            //linQ = hace busqueda como Querys

            ViewModelUsuario viewModelUsuario = _mapper.Map<ViewModelUsuario>(user);

            return viewModelUsuario;

        }
        public ViewModelUsuario Add(ViewModelUsuario viewModelUser)
        {

            context = new belakorgamesContext();
            Usuario user = _mapper.Map<Usuario>(viewModelUser);
            context.Add(user);
            context.SaveChanges();
            return viewModelUser;
        }

        public ViewModelUsuario UpadateUsuario(ViewModelUsuario viewModelUser)
        {
            context = new belakorgamesContext();
            Usuario user = _mapper.Map<Usuario>(viewModelUser);
            user = context.Usuarios.First(x => x.Email == viewModelUser.Email);           
            user.Email = viewModelUser.Email;
            user.Password = viewModelUser.Password;
            user.Nombre = viewModelUser.Nombre;
            user.Apellidos = viewModelUser.Apellidos;
            user.Direccion = viewModelUser.Direccion;
            user.Admin = viewModelUser.Admin;
            context.SaveChanges();
            return viewModelUser;

        }
        public Boolean deleteUser(int idUser)
        {

            Usuario user = new Usuario();
            context = new belakorgamesContext();

            user = context.Usuarios.Where(x => x.IdUsuario == idUser).FirstOrDefault();
            //linQ = hace busqueda como Querys

            context.Remove(user);
            context.SaveChanges();
            return true;
        }
    }
}
