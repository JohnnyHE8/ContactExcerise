using ContactExcerise.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactExcerise.Interface
{
    interface IContactRepository
    {
        IEnumerable<Contact> GetAll();
        Contact Get(int id);
        Contact Add(Contact contact);
        bool Update(Contact contact);
        bool Delete(int id);
    }
}