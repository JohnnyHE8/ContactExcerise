using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ContactExcerise.Interface;
using ContactExcerise.Repositories;
using System.Collections;
using ContactExcerise.Models;

namespace ContactExcerise.Controllers
{
    public class ContactController : ApiController
    {
        static readonly IContactRepository repository = new ContactRepository();

        public IEnumerable GetAllContact()
        {
            return repository.GetAll();
        }

        public Contact PostContact(Contact item)
        {
            return repository.Add(item);
        }

        public IEnumerable PutContact(int cid, Contact item)
        {
            item.CID = cid;
            if (repository.Update(item))
            {
                return repository.GetAll();
            }
            else
            {
                return null;
            }
        }

        public bool DeleteContact(int id)
        {
            if (repository.Delete(id))
                return true;
            else
                return false;
        }
    }
}
