﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FashionCollection_Project.Database;
using FashionCollection_Project.Database.interfaces;
using FashionCollection_Project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FashionCollection_Project.Controllers
{
    
    [Route("[controller]")]
    [ApiController]
    public class CollectionWearsController : ControllerBase
    {
        ICollectionProvider collectionProvider = new DBCollectionProvider();
        IWearProvider wearProvider = new DBWearProvider();

        [HttpGet]
        [Route("get")]
        public IEnumerable<Wear> Get(int id)
        {
            //FashionCollection f1 = new FashionCollection("Armani", 10, 2009, "summer");
            //FashionCollection f2 = new FashionCollection("Gucci", 10, 2020, "winter");
            //List<FashionCollection> l = new List<FashionCollection>() { f1, f2 };
            //DBProvider.AddCollection(f1);
            //DBProvider.AddCollection(f2);
            
            FashionCollection fc = collectionProvider.FindCollectionById(id);
            List<Wear> proba = fc.Wears.ToList() ;
            List<Wear> l = new List<Wear>();
            if (fc != null)
                l = wearProvider.RetrieveWearsByCollectionId(id);
            return l;
        }
        [HttpDelete]
        [Route("deleteWear")]
        public string DeleteWear(int id)
        {
            if (wearProvider.DeleteWear(id))
            {
                Logger.LogEvent(EventType.INFO, $"Wear with id: {id} deleted.", DateTime.Now);
                return "ok";
            }
            else
            {
                Logger.LogEvent(EventType.ERROR, $"Wear with id: {id} does not exist.", DateTime.Now);
                return "error";
            }
        }
        [HttpGet]
        [Route("copy")]
        public void Copy(int id)
        {
            Wear w= wearProvider.FindWearById(id);
            if(w!=null)
            {
                Wear newWear = new Wear(w.Name, w.Description, w.FashionCollectionId);
                wearProvider.AddWear(newWear);
                Logger.LogEvent(EventType.INFO, $"Wear with id: {id} copied.", DateTime.Now);
            }
            else
            {
                Logger.LogEvent(EventType.ERROR, $"Wear with id: {id} does not exist.", DateTime.Now);

            }
        }
       
        [HttpPost]
        [Route("addWear")]
        public IActionResult AddWear([FromBody]Wear wear)
        {
            List<Wear> wears= wearProvider.RetrieveWearsByCollectionId(wear.FashionCollectionId);
            foreach (Wear ww in wears)
            {
                if (ww.Name == wear.Name)
                {
                    Logger.LogEvent(EventType.ERROR, $"Wear with name: {wear.Name} already exist.", DateTime.Now);
                    return NotFound("Collection already exists");
                }

            }
            wearProvider.AddWear(wear);
            Logger.LogEvent(EventType.INFO, $"Wear with name: {wear.Name} added.", DateTime.Now);

            return Ok("ok");
        }
        [HttpPost]
        [Route("editWear")]
        public IActionResult EditWear([FromBody]Wear wear)
        {
            if(wearProvider.FindWearById(wear.Id)!=null)
            {
                wearProvider.UpdateWear(wear);
                Logger.LogEvent(EventType.INFO, $"Wear with id: {wear.Id} edited.",DateTime.Now);
                return Ok("ok");
            }
            else
            {
                Logger.LogEvent(EventType.ERROR, $"Wear with id: {wear.Id} does not exist.", DateTime.Now);
                return NotFound("Wear does not exist.");
            }
            
        }
    }
}