using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace BelakorGamesAPI
{
    public partial class belakorgamesContext : DbContext
    {
        public belakorgamesContext()
        {
        }

        public belakorgamesContext(DbContextOptions<belakorgamesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categorium> Categoria { get; set; }
        public virtual DbSet<DetallePedido> DetallePedidos { get; set; }
        public virtual DbSet<ListaDeseo> ListaDeseos { get; set; }
        public virtual DbSet<Pedido> Pedidos { get; set; }
        public virtual DbSet<Producto> Productos { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Valoracion> Valoracions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Database=belakorgames;Username=postgres;Password=alejandro");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Spanish_Spain.1252");

            modelBuilder.Entity<Categorium>(entity =>
            {
                entity.HasKey(e => e.IdCategoria)
                    .HasName("pk_categoria");

                entity.ToTable("categoria");

                entity.Property(e => e.IdCategoria).HasColumnName("id_categoria");

                entity.Property(e => e.DescripcionCategoria)
                    .IsRequired()
                    .HasMaxLength(250)
                    .HasColumnName("descripcion_categoria");

                entity.Property(e => e.NombreCategoria)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("nombre_categoria");
            });

            modelBuilder.Entity<DetallePedido>(entity =>
            {
                entity.HasKey(e => new { e.IdPedido, e.IdProducto })
                    .HasName("pk_detalle_pedido");

                entity.ToTable("detalle_pedido");

                entity.Property(e => e.IdPedido).HasColumnName("id_pedido");

                entity.Property(e => e.IdProducto).HasColumnName("id_producto");

                entity.Property(e => e.Cantidad)
                    .HasPrecision(2)
                    .HasColumnName("cantidad");

                entity.Property(e => e.Devuelto).HasColumnName("devuelto");

                entity.HasOne(d => d.IdPedidoNavigation)
                    .WithMany(p => p.DetallePedidos)
                    .HasForeignKey(d => d.IdPedido)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("detalle_pedido_id_pedido_fkey");

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany(p => p.DetallePedidos)
                    .HasForeignKey(d => d.IdProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("detalle_pedido_id_producto_fkey");
            });

            modelBuilder.Entity<ListaDeseo>(entity =>
            {
                entity.HasKey(e => new { e.IdUsuario, e.IdProducto })
                    .HasName("pk_lista_deseos");

                entity.ToTable("lista_deseos");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.Property(e => e.IdProducto).HasColumnName("id_producto");

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany(p => p.ListaDeseos)
                    .HasForeignKey(d => d.IdProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("lista_deseos_id_producto_fkey");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.ListaDeseos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("lista_deseos_id_usuario_fkey");
            });

            modelBuilder.Entity<Pedido>(entity =>
            {
                entity.HasKey(e => e.IdPedido)
                    .HasName("pk_pedido");

                entity.ToTable("pedido");

                entity.Property(e => e.IdPedido).HasColumnName("id_pedido");

                entity.Property(e => e.Comprado).HasColumnName("comprado");

                entity.Property(e => e.Fecha)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("fecha");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pedido_id_usuario_fkey");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.IdProducto)
                    .HasName("pk_producto");

                entity.ToTable("producto");

                entity.Property(e => e.IdProducto).HasColumnName("id_producto");

                entity.Property(e => e.DescripcionProducto)
                    .IsRequired()
                    .HasMaxLength(250)
                    .HasColumnName("descripcion_producto");

                entity.Property(e => e.IdCategoria).HasColumnName("id_categoria");

                entity.Property(e => e.Imagen)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("imagen");

                entity.Property(e => e.NombreProducto)
                    .IsRequired()
                    .HasMaxLength(25)
                    .HasColumnName("nombre_producto");

                entity.Property(e => e.Precio)
                    .HasPrecision(4, 2)
                    .HasColumnName("precio");

                entity.Property(e => e.Stock)
                    .HasPrecision(3)
                    .HasColumnName("stock");

                entity.HasOne(d => d.IdCategoriaNavigation)
                    .WithMany(p => p.Productos)
                    .HasForeignKey(d => d.IdCategoria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("producto_id_categoria_fkey");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("pk_usuario");

                entity.ToTable("usuario");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.Property(e => e.Admin).HasColumnName("admin");

                entity.Property(e => e.Apellidos)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("apellidos");

                entity.Property(e => e.Direccion)
                    .IsRequired()
                    .HasMaxLength(250)
                    .HasColumnName("direccion");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(25)
                    .HasColumnName("nombre");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("password");
            });

            modelBuilder.Entity<Valoracion>(entity =>
            {
                entity.HasKey(e => new { e.IdUsuario, e.IdProducto })
                    .HasName("pk_valoracion");

                entity.ToTable("valoracion");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.Property(e => e.IdProducto).HasColumnName("id_producto");

                entity.Property(e => e.Comentario)
                    .IsRequired()
                    .HasMaxLength(300)
                    .HasColumnName("comentario");

                entity.Property(e => e.Puntuacion)
                    .HasPrecision(1)
                    .HasColumnName("puntuacion");

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany(p => p.Valoracions)
                    .HasForeignKey(d => d.IdProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("valoracion_id_producto_fkey");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Valoracions)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("valoracion_id_usuario_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
