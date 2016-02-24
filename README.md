

# Gambar

web aplikasi realtime utk memfasilitasi kolaborasi menggambar, engine utama sudah berjalan, silakan sesuaikan dengan bisnis proses anda


## Usage

##Web service
examples:
curl --cookie-jar jarfile --data "username=admin&password=admin" http://localhost:3000/login
curl --cookie jarfile "http://localhost:3000/users/list"
curl --cookie jarfile  -H 'Content-Type: application/json' -XPUT "http://localhost:3000/users/update" -d '{"id":33,"nim": "9898","nama":"barang bagus"}'
curl --cookie jarfile -i -H "Accept:application/json" -H "Content-Type:application/json" -XPOST "http://localhost:3000/users/delete" -d '{"nim": "7676","nama":"tujuh enam"}'
curl --cookie jarfile -i -H "Accept:application/json" -H "Content-Type:application/json" -XDELETE "http://localhost:3000/users/delete/41"

## Developing



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
