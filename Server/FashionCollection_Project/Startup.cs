using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FashionCollection_Project.Database;
using FashionCollection_Project.Database.interfaces;
using FashionCollection_Project.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace FashionCollection_Project
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();


            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            IUserProvider userProvider = new DBUserProvider();
            ICollectionProvider collectionProvider = new DBCollectionProvider();
            IWearProvider wearProvider = new DBWearProvider();

            if(userProvider.RetrieveAllUsers().Count==0)
            {
                userProvider.AddUser(new User("Pera", "Peric", "pera", "pera", "pera@gmail.com", ROLE.admin));
                userProvider.AddUser(new User("Tea", "Ruvceski", "tea", "tea", "tea@gmail.com", ROLE.user));
            }
            if(collectionProvider.RetrieveAllCollections().Count==0)
            {
                collectionProvider.AddCollection(new FashionCollection("FENDI", 2020, SEASON.Spring));
                collectionProvider.AddCollection(new FashionCollection("TOM FORD", 2018, SEASON.Summer));
            }
            List<FashionCollection> pom = collectionProvider.RetrieveAllCollections();
            FashionCollection fc = pom[0];
            if(wearProvider.RetrieveWearsByCollectionId(fc.Id).Count==0)
            {
                wearProvider.AddWear(new Wear("Joseph", "Short pants", fc.Id));
                wearProvider.AddWear(new Wear("Hose", "Linen pants", fc.Id));
            }

            app.UseCors(options =>
            options.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
