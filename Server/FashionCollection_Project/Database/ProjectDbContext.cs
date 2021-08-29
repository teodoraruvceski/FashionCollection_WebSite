using FashionCollection_Project.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Database
{
    public class ProjectDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<FashionCollection> Collections {get;set;}
        public DbSet<Wear> Wears { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=FashionCollection;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        //    modelBuilder.Entity<Wear>()
        //.HasRequired<FashionCollection>(b => b.FashionCollection)
        //.WithMany(a => a.Items)
        //.HasForeignKey<int>(b => b.FashionCollectionId);
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
