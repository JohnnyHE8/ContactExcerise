var app = angular.module('contactModule', []);

app.controller('demoCtrl', function ($scope, $http, ContactService) {
    $scope.ContactData = null;
    ContactService.GetAllRecords().then(function (d) {
        $scope.ContactData = d.data;
    }, function () {
        alert('Error Occured!');
    });

    $scope.Contact = {
        CID: '',
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        Email: '',
        Status: ''
    };

    $scope.clear = function () {
        $scope.Contact.CID = '';
        $scope.Contact.FirstName = '';
        $scope.Contact.LastName = '';
        $scope.Contact.PhoneNumber = '';
        $scope.Contact.Email = '';
        $scope.Contact.Status = '';
    }

    $scope.save = function () {
        if ($scope.Contact.FirstName != '' && $scope.Contact.LastName != '' && $scope.Contact.PhoneNumber != ''
            && $scope.Contact.Status != '') {
            $http({
                method: 'POST',
                url: 'api/contact/postcontact/',
                data: $scope.Contact
            }).then(function successCallback(response) {
                $scope.ContactData.push(response.data);
                $scope.clear();
                alert("New Contact Added");
            }, function errorCallback(response) {                    
                    alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please enter everything!');
        }
    };

    $scope.edit = function (data)
    {
        $scope.Contact = {
            CID: data.CID, FirstName: data.FirstName, LastName: data.LastName,
            PhoneNumber: data.PhoneNumber, Email: data.Email, Status: data.Status
        }; 
    }

    $scope.cancel = function () {
        $scope.clear();
    }

    $scope.update = function () {
        if ($scope.Contact.FirstName != '' && $scope.Contact.LastName != '' && $scope.Contact.PhoneNumber != '' && $scope.Contact.Status != '') {
            $http({
                method: 'PUT',
                url: 'api/contact/putcontact/' + $scope.Contact.CID,
                data: $scope.Contact
            }).then(function successCallback(response) {
                $scope.productsData = response.data;
                $scope.clear();
                alert("Contact Updated!!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    $scope.delete = function (index) {
        $http({
            method: 'DELETE',
            url: 'api/Contact/DeleteContact/' + $scope.Contact[index].CID,
        }).then(function successCallback(response) {
            $scope.ContactData.splice(index, 1);
            alert("Product Deleted Successfully !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    app.factory('ContactService', function ($http) {
        var fac = {};
        fac.GetAllRecords = function () {
            return $http.get('api/Contact/GetAllContacts');
        }
        return fac;
    });
    
})