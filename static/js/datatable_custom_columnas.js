$(document).ready(function() {

    $('#table thead tr').clone(true).appendTo('#table thead');
    $('#table thead tr:eq(1) th').each(function(i) {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');

        $('input', this).on('keyup change', function() {
            if (table.column(i).search() !== this.value) {
                table
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        });
    });

    var table = $('.datatable').DataTable({
        dom: 'Bfrtip',
        aaSorting: [],
        orderCellsTop: true,
        fixedHeader: true,
        buttons: [{
            text: '<i class="fa fa-files-o"></i> Copiar',
            className: "btn btn-cgr",
            extend: 'copyHtml5',
            header: true,
            copy: 'Copy',
            copySuccess: {
                1: "Copied one row to clipboard222",
                _: "Copied %d rows to clipboard222"
            },
            copyTitle: 'Mortadela'
        }, {
            text: '<i class="fa fa-file-excel-o"></i> Excel',
            className: "btn btn-cgr",
            extend: 'excelHtml5',
            autoFilter: true,
            sheetName: 'Exported data'
        }, {
            text: '<i class="fa fa-file-text-o"></i> CSV',
            className: "btn btn-cgr",
            extend: 'csv',
        }, {
            text: '<i class="fa fa-file-pdf-o"></i> PDF',
            className: "btn btn-cgr",
            extend: 'pdfHtml5',
            customize: function(doc) {

                doc.content.splice(1, 0, {
                        margin: [0, 0, 0, 0],
                        alignment: 'center',
                        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApsAAADuCAYAAAB24sw/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAIN9JREFUeNrs3Ut2E8m+L+DYZ+1+eY+gxAjKdG4XuXs7mBFgd24XPALwCDDd00GMANO5XYvu7WBGUKoRbJ0R7Jt/FFkII9uS8qF8fN9aWqIoMFJkZsQvI+OREgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAPf6hCGC8/tf//u/j4u0o/+f6r3/L/33XJL+2Md/we4vi9demP/P//u//mTsiAMIm0J8geZQDYxkQf8/vR/cEya64LV7LtWD6/b+FUQBhEzhMqCwD5fFaoJwO9Osuc/i8LYOoEAogbAL1BctpDpV/DDxU7mqRA+i34jUXQAGETeDxYHmcg+Wz/H6sVHYS4XO+FkAXigRA2IQxh8tpWvVUluHySKnUapHD5xfhE0DYhLGFy6kSaV3Z8/nZY3cAYROGEC4nxdvpWrjUc9kdyzJ4Fq/rInwuFQmAsAl9CJhluIz3iRLpjWvBE0DYhC6Gy6McLJ8nvZdDMUurR+3XigJA2IRDBMxJ+vF4/FSJDNYyB8/3JhcBCJvQdMCMHsuz4vUyWZJojObF62MROmeKAkDYhDoDZvmIXA8mIXo73xevmd5OAGET9g2ZZcA8Uxo8YJZWvZ1zRQEgbMJjAXNSvL3KAdMkH3YxTx6xAwibsCFglo/JI2Qah0lVi+J1KXQCwiYImcc5YEbQ1ItJE6GzHNdpzU5A2IQRhcyzNO5ezAg+t3v8vaOk53ff8o7QeSV0AsImDDdgTtJwx2LO83sEyP+583vff7+pkJP3eS+Vv/49rXZNEk6FTkDYhMGHzAhAL1O/Z5Qv8qsMk9+DZF9mP+egP8nBMwLos7VfjzV0XhjTCQib0O+QGeGyb4/Ky0D5Lb8vikByO+BjVPZ8xg3B7/l9MqLTNI63iUSAsAk9Cy9lyOx6aLldD5bWaNwYQJ+lH4/mhx46z50DgLAJ3Q4or3PI7OKj2QgTc8Fy7+M7HUn4jPPi0vkBCJvQnRAyKd7epO6Nx7zNweFLDpcLR6vWG4sInM/TcB+7z3LodN4AwiYImb+Ey7mZxq2eC/HIPSaAnQ4weF4mM9cBYRNGGTKFS8GzLWauA8ImjCBkLnO4/JzD5cJRETwPcINzYTwnIGzCcEJm2Xv5ccjLD43kPIrA+Tz1e63V0iwZzwkIm9DbkHmd9F4O+bzq09JYD/m+E1Fxjr51VAFhE3YPA69z0Gyr0V4PmMZejudcm6Zh7CxlfU5A2IQdQmYb62T+HTCLRvpa6Y/+3JukH72dfd0+8zqHTjdLgLAJGxr7aOijJ3MiYHLgG57TFs7FJs/xGMt55WgCwiakvx9jfmiwYRcwqXIDFI/Ypz38+DGZ7dykNkDYZMwN+SSHzKYa8nnx+hhB02NFarghetPT0Bk9nJeuAUDYZEwN91FuuF838OOjQZ2l1QzdhdJG6PwurgUTiABhk1E01uUM87onYMSjwvdJLyZC50NMIAKETQbdODcxLnOWVoutz5UyQudWljlwGr8MCJsMojGOcPkurWb31tlYRsj0qJyunOdnqX+z1+c5dLqGAGGT3jbAb1O9axZGoxgTfq48BqTDofNd6s86nZZJAoRNetngTlO9j8wXuUGcKV16cP63vftVHeZJLycgbNKTRjZ6dc5qbADfG1tGT6+HSap/CEmT9HICwiadbljrnGU+z43eXMkygGtjmkPncU8+clx3ejkBYZPONKSTVN/C7LNkZjluyLpALycgbNKJxvNtqmdc2iw3bAulysCvmbqHmjQtbvz0cgLCJq03mPE4MHozqz4WFDIZ6zU0Tf15tK6XExA2aa2BrGubSSETUiPLgzVpnvRyAsImDTaK01R9OSMhE369tiapvnHPTdPLCQib1N4Q1tGbOU96ROCxa+00h069nICwyWgav2mq1psZDZIljGC3m7u45vqwNqc91gFhk0qNXkxe2Lc3U8iEatdfn3o5r3PotIUsIGyyVSNXZab5Ijc6QiZUvxb1cgLCJoNr3N6m/dbNjJBp73Jo5rrUywkIm/S+MZuk/WbDRoMSe5e/VYrQ6DWqlxMQNultI3aWVotL79prclm8rvRgQKvXq15OQNikN43Wvj0ls2StTDj0tfsp9WddTr2cgLA5wsZqmnZf0miezDCHLl3HsVpEjLHWywkIm3SqgXqbdpsEtCheF3omoJPXc5XVI9q2zHXJzJEDYZNhNkq7Pnoz+Yc+B7Cyt+92DL1pFdfFbds82X0IhE0G1xBNc9Dc9nHbLK16IDzyok/nedwYvUy/Dg+5TashINeu804xyRCETQbSAO3S4zHPIfNWydGjczzC1U16/FHyrDi3z0dQFn1ZIil4tA7CJiNogFX49P1c/5q2H7MYPWkXIyiTuMF816OPvEh2HwNhk141NNO0/eM0j7Lo87n+Nu2+69XJGEJNzyYPleK4WPUCBui/FMHgGt+bLYJmVOZPYgKQoEmPvWzp7/ROHg5zklZjsPsibpRvinrsJt80AwOhZ3MYIXPb2eYWWWYo53z02H3d468ui/P/XyMrq7O0305hhxY3xXo6YQD0bA6n0X0saF6lVW+moMkQHLX893orj8eOXs6+Tf6LOq3s6TxzykN/6dnsd9CMCvjDFr0DZpkztHP/exDZM3z9Y6RlFkE7ejj7GtwWaTXO/NrwHxA2aafh+PBIoxGVcTyCulJaDPD8nxRvf+4TWIpr4omb1F4+Vl+v22ZptfHEwtUAwib1NxTbLGtkL2LGcC1E2Jzs+NdGsfzRlmH9U+rXbPX76rqPhgeBsEl9DcRxeni2edzl28ucsVwPZ+nxYSR3PdEb9lMZ9mmry4cscvDU2wnCJg02rPG4/FJvJiO7Lh4bTrLu3OYFG8twmuuWyUC+0rx4fUzGdoKwSW0N6iLZfQPXx2OBU9B8uAzjaUkskP96YF/NY3YQNtmiAXho/czoyXyrpHCtfO+de5WvlaO1G7F5vk4WSmnrchxSL2dpmYPn5zgn9HiCsEn6e3zmp3sq/VjG6NxyRkBDN7lD7OVctx483YiAsDnKyv40rXoXNk0E0psJtFEPTdNqiaTjgX/VuGmfR/g0HAmEzbFU8Gdp80QgvZnAIeqk6OF8k8az+1IEzi9p1espfIKwObhK/b6JDtYGBA5ZN/V996Eqyp7Pb/FrN/wgbPa5It80EWiRzDQHulNXRR31Jt0/aXEs5rl+/iv/eimEgrDZ5cp7kjbv5DFLqwXazZoEulZvxbjy6OmcKI1fOggWa0G0DKZ///9tJyTlYF+K9uFWxwPCJvtU2Jt2BIpweW5dOKAHddhZWvV0Cp3NMjEUYZO9ewbuzjiPu9YXejMBoZPcJpxbnglhk30r5rszzuOR+ZXSAYTO0VvkNsETLoRN9qqM3+bKeL1SeWFwOTR63cUThNO1EPR9Rxk9Ro2GzpfJRKJ9QualrVURNqlSAd9d2miWTAKCpq+7h9aJnCdDV5os+xiX/iqNc8kkIROEzVYr3GjkImie5t9a5pCpYoF2b/A2ievxqV7OxuvAsxw8J0rkp5udj9oChE3qqGRjxnm5tJGdgKCday9u7j5t2+gX1+SJUmvluJS9nXF8jkZYBN+HcBSv99oBhE2aCJpx9+qxObRz/f2ZdutFe2FCxkFuCJ6PJHjOi9fHtBorrA1A2KS2u/f1NTTPPSqBVq+/rzv+tVlxjZ4rvYMHz2kazqP2uHn5kkxGY+T+qQgaD5pRwZhtDu3ap5dsotgOJ/cqX6/VoRE6n+X3vvR6Rn0/L16f02pohh5MEDYbD5rzZKYrwK7BM27O43W1Vq8e5/BZ/roLbnM9/y2Hy4WjB8Jm00HzLK32C46geVVUPBdKBQ5inxs8Tx+6Hz5nd27s4zUpXn/kenfa0EeY53MqQmUEyltPq2B7xmzWGzQ/JMsaQVeuyV0nCJ0U1+1cyQ3i2B+nH4/eJzucB8u1m46lQAnCZheDZtzxGp8J3bguLX0E0AH/pQhqC5oRMJ8KmtANecLJbIs/+v0mUYkBNEPPZj1B05Ip0N3r9KHtKiOQnpvEByBsdjloxvjMKyUCnb9m47F6OYv5+y4uZg8DCJtdbbTKfc5NBAIAEDYbCZonxmfSgfMxHg2fpbyuq9nUAAib/Q+a8RjuhcdvdOB8vLslajB+GIBOMRt996B5ImjSEZsmvZzlEAoAwmaPgua7/MsTs1bpkNN7fn+qaADoCttVPh40z4q3I48m6aAYM7ypF3OhaAAQNvsTNJ8JmnTUZfp1h5zbvJg5dK0+naQ720aa0KZcGQcThB4OmkfW0KTj52k8Sn+V/3ORVstxGerBIc7FGD8cPe3T4vV7DkDre5Q/JgJSnLvf0qrX/tb4+NrKNXzJdcRcuSJsdidoJmtoAjxYV0YAep6DUBMT0xY5LH3OIWk5knKNm8hnDZbrcq1cr92gImwKmgBdqiMj/LxMP9Z3bVMMEfk4xKEiObhHuZ4eqFw/H7rdK8rgbYW/fptD9KMMMxA2u1CJTox5g95du0e5kZ7k37IdZTM34jFkowtLa8XxfZ9W68ouBnDevkl3xl2OsVyL8vhPy981QmcML5jbpEXYbPXO0h0P9DIExfJkm3qDropr+kIpVS7froShTWbF67JPoTOHzNc5vB8p14OEzbvie37s+w2MsAnQTBD68FijaUWJ/W6+c9lOevKRL/PNxbIH5+ybnpRr2dPZSrkeOGz2+gZG2ARopmGKxvpr2q5n6MRTi63L9SiHzNMefvwIBxddHAqVh2lFD/xUuXY+bPbqBkbYBLoQyM7yfw5qDc7iu73Ojfc2YvzmC2fEo2V6moPmUc+/Spzn510JCTueq6Mt1w6GzTJovzCmU9gENlfcZ+nXR8xRYQ5i29Xi+8WC9tv2vi2K7/zEWXFvWR7lMHQ2oK918JCQyzXO0+mAynWZy3U+krBZOrdKzf7sjQ7DDA/TtHks43H6ddehvjpq6M+O7VyZFG83AwuaIb7X13I5uwOUa1xrXwcWNMtr6Sb31o7Jh+I7f0gIm8Dfnj/w/6a5x6XvvuzwZz0CezgQHQ/4a7YeEvJwhJvUn8lV+3g3wvB1JnAKm8APxxX/fx/sMv70s1Pil0A0zYFoDL2+rYWE3JP6aUTl+nUgN6+7fOd3CWETeLQnr/c9fXks3vWWZTFzSvwSiMYSNFsLnFsuxTXEG9ubkQXO14caniFsAl3y/oH/NxvQUh6xfub8kaB5bumSnwLR6QgDUeOBc6RBc8yB80MehoKwCeOUFyOOIHY3ZEVP4MWAvueyeJ1sCJ0RMmONvBNLlvwUiI5HHIgaC5zK9e/AObbHyx9GFrD3ZumjcTU005p+1FID3ptjfpR+jM903MZ9LkzS9ovg12GRQ/+3/L58IKT8nt+nLRZJ7BDztqagedPBco2y/O0A5br3FrEdX/qo9u8rbNK38HicK7rf0s8TP9qqYJbp5zGAX9YqxYWQA5246bhJzU8Mi+s89pe+3nerv/yY/1laLcXUdIB7UWWjgxbLNT5jTHKbVyzXWKXitKvl2tOwGZ5q44TNvjcQx2th8lnLIbIJ8xxOv62F0Vtj6jp9Dq43+os6FjbO49terv1WnAf2Im7uOH5Iza2jucxhqPbjt3aeTBv87HsPtdhxY4F9PluMvZ41VK6vGgzJyxzAFjt+rr6GzXkezoOw2fnGYJp+fpx0nMY1U7TsHY3XXzmAzp0ZBz0no0F6t+E83HsXoi16guzS0cxxbGo84VUOmcuGv8M0n4t1h6O9w2aD5VqGzKuWyjW+w6TmHx0hc+fdmyqGzZPH2ow85CG+8/MGbmBOtFnCZtcq//KE/2MtWLJZGUC/CaCtnqPR+PxZ95188XNvtqjkVdr1HscmxmnO843BouXvE7vWvKnp+8xzIFp2qFy/T+DrebnuvX9602FzwzGMG5i6eqZj6MgLtY6wecgKf5ob2GdpeFuXHcI8B9AvOfR4BF//ObvNY9edxinlMWPbbJXpkVR9x3GbcL+rCENXB/xOdew3Xuk7NFCuyxzQrg9YrhG+PlT4XvEdLiuWa2thc+3fPEv19VA/MRRos38qAuGyh8ryfZ3L+zYHUOGzPpMt/sxp2m1x+GfbHt8IFI5j5XrotOb6JxrRF4eeCJHPi5Pi+71Nq964XZTrrt52qFwrf6aaynVxyHI94Pee5TakjhUF4ty4SgibDd4RRuVTjgOx7la7yqEI6+EzZm5emyHYueO0y5+dK7K966Sog+pc83DvcboNhoS3+Vr/sGWdO0urHs2q32EM5bpI2/f29X7pn2gniu98kar3cL4UNoXNJgLmaT65jLnsZvh8Uxyncqbslxw+9ZZtZ7FlQ7lrwzrd4c+yv7jxmgw1EK2FhOscjB7qlartEXXu9RtDuW7T23fwR/8NfOdyya292x5PZTazg9Dulc1ZXu7iz9TM7EjqVS7dE3es/45jl4+h3ueHfXysodyjkfm2bdBVWVeqo+LcfjX0QLQWEr5/xrR5cfN5Wo0tvlaue5XrfRNeolyfDCVorrlI9y+Sv0tnB8LmfpVM3NEWr3/n0HKqVHrrVPDcqqGJxuT8vjD4wP97sOcgbddjaTeOas5SPUN5Fl0PRHeC0d3zJiarnNQ4YaOucr3tUbluqgcucrkO7oYwf6dZxR8zVQUJm3uFzLTqxaxrWQgEz75UvFHpPkmrMUjz/IoGvcpuGefp4Uf0VwPsLWlbHb1v0ei+6FOgyOfr5VpIftvRcj3vYble5XJ9esiVCFryseLf/10V9CtLH90fNCOIxGPyidIYlXKM52ehp7mbuLQaUxgT6o5zmUeQfW99zVrqrU81/KjeLq7fxJg55dpMuW74N1pf+uiezxFPMffteLB02wYmCG0+0d7lxnDobtN241PGtJtROcbzLE88iLvcmbXT6pMbrLf5Rb1e1vAzrvu8i1NDgUi5jmsc9S6TGRE2RxM0y60ew5cNv/f94qmzssi7IJUBdJJ+9AA/G1BAje8UwydiVnv0cn7U20mH66643qqOJ486wphZ5QrCZoOVyqTDQXOeK6yY0bsoX4fqcdt2zN5aKI27xN9Sf/d9j8bmdK2388qMaTp4jlb1Xi++cgVhs/uVStW733Iv8L/y+6LPldRaKJ1v6C0og2ef9oiPG5Kyt3OWVjNeNSJ0wfMa6h8LUitXEDYb1lZo2BQqb8fUU5a/63xDCJ3m0Pksv086/DXO0mps5zyHzrlLiAOaVvz77/XWK1f+7lRA2GwsAF3nXRPq6mEbfajc4xiUAfQqh89J+nmf+S5WAvG5pvkR+2WfJwHQT3fGUO9L71sz5ao+6NcxnwibwmYbYsmCXRZuLwPl3fGUQmU94XORK+tZD8JnfJYPxWd8I3RygBueSoFIfdVIuV4bZjO6Y/5FEQqb24Sb74sZ51BzdxxhGSS//1ol0onweZwrh+epO0tVCJ207Y+Kf/+zIlSufPem4t+XC4TNnUNNvCx10+3jVA5TuFpbouRZfj/0jHehkzbPtSrmilC5jl1RV7+u4ZjfKslf2UGIIVccETifdyR4lne8QidNnOt2PGmmXKvsaBNDqZ4qxdbKu9IOQvkp2U3FtmJZfIZ/OZK/sjc6gxUTvorXeb74X6TVo/dDjkuLO+bo6fwz9mF3hKhRlQbSGLPN4aPqDaoern4d6w+peqeEJ6HCJoLnT8HzkJVCGTpv8lJPUKWhrLp6xkIpblS1XP9ShL25fm5SPavQGKMrbMJPwTMCZwTP83S4HogImhE4P+UJabCPqr0xwmYz5oqg80HzdY1Bc2E74/uZIMSYQ2c8Up/FK4e9V2m1UHvb4zvLrTBjncNLS9DQMo97GVPAnOQ6N+r7Om/yPypdYRMeC56L4u0iXnk85cvU/lJKcZcdOxJF4LTANm3edPGrqkFkoQhb9a6oOx87l+tYpH8TW5IKm7Bz4ztLh+vtPMqVZvy7Fx7LQD/DZlvrMOcxh+96WtfWuQrC8QG/ii1JhU2o1Fis93a+arFCi4buk33XgS1uUKc9/NyLgZR/fA+9mo8wQQi2C56zvGZe3InPWvynoxG5MXMdWldpLGsNqwQM3VDC5rleTWET6g6dsQB2zGB/UrwuU3vrdgqdNMJKCPeqem0fKcLBu/LUSdiEJkNnLHPxNofOixbv0oVO6iZswu6i4+FCMQib0EbojO3J4u42Quf5AULnV7sRjV7Vc07YbO4aZZhiiMULxSBswiGC5yyHzhjXOW/pn41xYeUWmG9r2GKP/p13VcPmH0pxY7lWvYZ/V4oP6us2qRE0T4zTFDbh4I1UXtIjJhTNWvpnJ8XrTfH6dxE4P5icMDpVAqdz5X5VAsVU8Q2OoClsQudC5+2BJhOdFa+v5SN2vZ3C5mOhyDnyYLjY+wbQ5KsHzXv2eb+vSCJoCpvQ1dC5PpmozXGd3x+xpx+9naeOhlB0D+eGcm3bskef8yJ3HLAni7pDe6FzfS/2aVotEt9WY3SWVlthlp/hY/S8OiqD8a3i33+e2l0/dizlGtveWvB7c33Yh/pnnlbraC4csWr0bMJhKtoY1xmzGZ/kxqitu/x4XBp7sH/Nk4reGd85CPOKf//Uo/RGyvXYo/RGyrVpES5fxNh7QVPYhCGEznjEHo9o/pVWj9jbrIQnd4KnR+09Po9S9eEZr5VkI+X6Skn+ossz0WM5uyfF69phEjZhiA3bbG0We5u9nWXwPEur/dj/U7zi/bVemV6peqPySu9mI+Vqkl79Zdqko1hGziESNmHoofP2gL2dpejhfFe8/lzr9TwTPjvtc9VGNundbKpc3yjGvy0b2uLxNteVddykv1LX1esfigC6L1d8Z2k14eDQleAiV+rxKOzWRKPKx3YagaSOx3bFz/p3qrYndzTUT41Tq71cw5MmyjWPuX5X44+cNFzHXOfx6pu+y38q/NwYXznPO6p9aPJzImzCWMJJhM7TGhrAOixzr8KX/H4rrDx47KIhf5ZWS1PFr9/npbHq+Pkf8k1JFeWmBCjXu+XwKVVfQSNmd8+aCpv559ykehbVP2moF1bYBHpV+Z+uBc+umefw+Vd+X4wlhObepkkOlH+s/XpdNLgXdS4Snf/drzX8qPhcVz0t+wgZn3KouVautZVrDLGo2oO6zMODUsNhs67jtchbECNsAnkCQgTO56n7C0lHgxAB61v60Sua+tSDkIc1xOsoh8jf0o+eyslDjW3xigB02VTwjp2jUj1bUD7t2xCJfFy+ph89/tc5dC5r+Nl19Zb1sVzrCm+zhxZHryts5p8VwbiOMciXdT15EDaBoQbPaerGo/Zd3KYfg/y/3PP7Za/DoqbyuhvO1kPFH2tluG/YiM/9vnhdNb3dXY1j1uJzPunL9nz5ON5sOJbLVEMv58jL9c+a6pEHx63WHDbr+tzGMQubwBaNxXrwnCiRVkXj9/G+MWoNHvM/azrWt7kRX3b8HL8vaK6r3MupXKtdC4+NWa0zbNZ8gzCzXWU1lj6CgYsenago89ijWMPzInV/B48+WxSvy7TqxTlpO2hmlzX9nAgZN11eJ3KHQBQ3XX9W3LhAuR6+7Hap+2Y11XVneSwwe9KzCSOVG5OoQJ/ld9tWVguY0XPWmT3naxxjGOI7vejao8Q8RvPTHuduTNK53KdnsYFy7VwPZx6jGeU6qelHbjUTv+6ezbXvUsd401hl46mqTtgEqjfc0Yj+IXxuHRRiwe/rLk74yD0xNzX+yGUOnPMOfb8IRPv2DkZwPt/1+4ygXM/SatZ5nb2uW60x2kTYzD+3rslCvV1NQNgEuho+y4kz0biW60KOedu927WAOe/DBI8aG9l1B52dm8/LNzV+r517OQdcrjG+8fRQ36vBsFnnZKHeTO4SNoG+BtBJDp3l+pHlcj9Dc3eh+nkfG5jcyH5t4BhFmVy03RuXx1u+a+D77LRbzADL9SzV35sZFmk1k3u55edoJGyufUeThYRNoMchdJp+rDn5e/qxiHkfekLn6ce6n4PbAamBx74/NbypwTVD73yH6M2cNvRP7Lz2ZcPlep1DZ9PlepbLddKFcm0ybOafb2chYRMYaBAtQ+dkrVFbX7ty0zqXdQbJUrlmZ7le5+1YHocVx+BtDhVNKSdHXdf4mcv1Yl+lZscP7z0Or4VyjfP3fc3lOlkr10mDn33nYQEthE2ThYRNgJ8ahl17IJZ925ml5fKsY1/rR49BDp57jWtdm6TW1k5YlR+J9qRcj9fKddpCue40LKGtsJn/DZOFhE0AGgqbda+buI1Ffn154M8cathFLcsOdbhcy6cH05ZPtb3LtaWwabKQsAlAw4GziYktfRNB7WldQWHDnuxjVSnAtxE2878TPZvvavi+JgttyQ5CACORQ0A83hxzb0y5ruWyxnKN8HqiXKttB9ridXCVg3FVdhYSNgHY0NDejjgYxXc+aWJs78jLddFUuTbooqaf8yYhbAJwbzAa04Sq+K5PmwxEIw2cjZdrQ8dqnlZLd1U1zUtIIWwCMOLAWY4lXCjXWs1TB/d238FFTTcG7/J4aIRNAO4Eo2VeL3A24K8ZkziethmI1gLnfMDlelV8zz4HzXIM82UNP6rcQhVhE4B7Gt2YURuvIT3+LSesnB+oTCPIR+Ac2lqM5QSri4Gc+3VNFnqd1zNF2ATgnkZ3lobz+HeeVuMIZx0o14tcrosBlGssLP+kzh2NOqKu4PwuIWwC8GAwKrfhq2ssW9vK3syTLu1vnyejRLn2tZczyjJ6M18McRFzk4WETQDab3yvcjia9eQjl2PvnnShN/OeMl3mXs4o13mfyrX43EPszbzLZCFhE4CWw9Eij3d80uHQuR4y3/ZkQfHbPJazyxOIfirXkZzvJgs1yHaVADwqb8n4qnidpcNvy7goXh/Takb0suflOi3eXuZyPbQYr/u+eF0folzb2q7ykc8Q247WMdGnd2uPNumfigCAx+QxkPGo8SKPS3tevE5b/AgRfuJR7uchPdLNAWlelOlFDpwvawo7uwT3KM+PwtF3cRxuavg5MVnoRHGu6NkEYC95bNq0eD3L73WHpAhiX+K9jl6rHpXr5E65TmoO7evlKmAibALQq6BUhs6jHJZK0w1/fJF+LAkU73/l91sh6JdQf7yhXI/uCfjr5Rrl+D85YC66NEsfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB29f8FGAAVxOu2C4fnuAAAAABJRU5ErkJggg==',
                        width: 334.00,
                        height: 119.00
                    }

                );
            },
            messageTop: 'INFORMACION CONFIDENCIAL',
            orientation: 'landscape',
            pageSize: 'TABLOID',
            background: 'simple text',
            pageMargins: [40, 60, 40, 60]
        }],
        "select": true,
        "language": {
            buttons: {
                copyTitle: 'Datos copiados',
                copyKeys: 'Use el teclado para copiar los datos',
                copySuccess: {
                    1: "Se copió una fila al portapapeles",
                    _: "Se copiaron %d filas al portapapeles"
                },
            },
            select: {
                rows: {
                    _: "%d filas seleccionadas",
                    0: "",
                    1: "1 fila seleccionada"
                }
            },
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "No hay datos",
            emptyTable: "No hay datos",
            info: "Mostrando página _PAGE_ de _PAGES_",
            search: "Buscar:",
            infoEmpty: "No hay datos",
            loadingRecords: "Cargando...",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            },
            infoFiltered: "(Filtrados de un total de _MAX_ total registros)"
        }

    });
});