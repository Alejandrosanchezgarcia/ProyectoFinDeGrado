using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Infrastructure.Classes
{
    public class ViewModelPedido
    {
        public int? IdPedido { get; set; }
        public bool Comprado { get; set; }
        public string Fecha { get; set; }
        public int IdUsuario { get; set; }
    }
}
