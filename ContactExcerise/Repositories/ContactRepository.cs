using ContactExcerise.Interface;
using ContactExcerise.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactExcerise.Repositories
{
    public class ContactRepository:IContactRepository
    {
        ContactDBEntities ContactDB = new ContactDBEntities();

        public IEnumerable<Contact> GetAll()
        {
            return ContactDB.Contacts;
        }

        public Contact Get(int id)
        {
            return ContactDB.Contacts.Find(id);
        }

        public Contact Add(Contact item)
        {
            if (item == null)
                throw new ArgumentNullException("Add Error");

            ContactDB.Contacts.Add(item);
            ContactDB.SaveChanges();
            return item;
        }

        public bool Update(Contact item)
        {
            if(item == null)
                throw new ArgumentNullException("Update Error");

            var contact = ContactDB.Contacts.Single(a => a.CID == item.CID);
            contact.FirstName = item.FirstName;
            contact.LastName = item.LastName;
            contact.PhoneNumber = item.PhoneNumber;
            contact.Email = item.Email;
            contact.Status = item.Status;
            ContactDB.SaveChanges();

            return true;
        }

        public bool Delete(int id)
        {
            Contact contact = ContactDB.Contacts.Find(id);
            ContactDB.Contacts.Remove(contact);
            ContactDB.SaveChanges();
            return true;
        }
    }
}