using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Infrastructure.Classes
{
    public class ViewModelValoracion
    {
        public string Comentario { get; set; }
        public int Puntuacion { get; set; }
        public int IdUsuario { get; set; }
        public int IdProducto { get; set; }
    }
}
