using System;
using System.Collections.Generic;

#nullable disable

namespace BelakorGamesAPI
{
    public partial class Usuario
    {
        public Usuario()
        {
            ListaDeseos = new HashSet<ListaDeseo>();
            Pedidos = new HashSet<Pedido>();
            Valoracions = new HashSet<Valoracion>();
        }

        public int IdUsuario { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public bool Admin { get; set; }

        public virtual ICollection<ListaDeseo> ListaDeseos { get; set; }
        public virtual ICollection<Pedido> Pedidos { get; set; }
        public virtual ICollection<Valoracion> Valoracions { get; set; }
    }
}
