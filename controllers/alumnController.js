//invoke the DB connection
const conexion = require('../config/conexion')

const fs = require('fs');

//Lee el archivo de texto
//const contra = fs.readFileSync('ocultar/contras.txt', 'utf-8').trim();
const contra = process.env.SECRETA_CLAVE;
//console.log('contra', contra);

exports.resultData = (req, res, callback) => {
  //console.log('resultData function called');

  // Recupera el valor de búsqueda de "req.body.search"
  const searchInput = req.body.search;
  //console.log('Elemento buscado en función resultData:', searchInput);

  // Verifica si el valor de búsqueda está vacío
  if (!searchInput || searchInput.trim().length === 0) {
    // Realiza una consulta SQL que selecciona varios campos de la tabla "alumnos01" sin filtrar por ningún valor de búsqueda.
    //let contra = fs.readFileSync('omitir/contras.txt', 'utf-8').trim();
    //console.log('contra', contra);
    let partsql00 = "SELECT";
    let partsql01 = "`COD_CLI`,CONCAT(AES_DECRYPT(unhex(`D_N_I_`),  '" + contra + "'), `LETRANIF`) AS DNI,"; 
    let partsql02 = "CAST(AES_DECRYPT(unhex(`NO_CLI`),  '" + contra + "') AS CHAR) AS NOMBRE,";  
    let partsql03 = "CAST(AES_DECRYPT(unhex(`AP1_CLI`),  '" + contra + "') AS CHAR) AS APELL1,";  
    let partsql04 = "CAST(AES_DECRYPT(unhex(`AP2_CLI`),  '" + contra + "') AS CHAR) AS APELL2,`TEL_CLI`,REGEXP_REPLACE(`PERM_SOLIC`, '[^a-zA-Z0-9]', '') AS PERMISO,";  
    let partsql05 = "CAST(CONCAT(AES_DECRYPT(unhex(`NO_CLI`),  '" + contra + "'), ' ', AES_DECRYPT(unhex(`AP1_CLI`),  '" + contra + "'), ' ', AES_DECRYPT(unhex(`AP2_CLI`),  '" + contra + "')) AS CHAR) AS NOMCOMPLET,";  
    let partsql06 = "DATE_FORMAT(`NAT_CLI`, '%d/%m/%Y') AS FechBuscada,TIMESTAMPDIFF(YEAR, NAT_CLI, CURDATE()) AS EDAD,";  
    let partsql07 = "CAST(CONCAT(AES_DECRYPT(unhex(`DIR_CLI`),  '" + contra + "'), ' ', `NUM`, ' ', `PISO`, ' ', `LETRA`) AS CHAR) AS DIRCOMPLET";  
    let partsql08 = "FROM alumnos ORDER BY COD_CLI DESC LIMIT 1000";
    let sql = `${partsql00} ${partsql01} ${partsql02} ${partsql03} ${partsql04} ${partsql05} ${partsql06} ${partsql07} ${partsql08}`;
    //console.log('SQL query sql:', sql);
    conexion.query(sql, (error, results) => {
      //console.log('SQL query results:', results);

      // Maneja los errores en la búsqueda
      if (error) {
        console.log('Error en la consulta SQL:', error);
        // Si ocurre un error, envía el error en la respuesta HTTP con un código de estado HTTP 500.
        return res.status(500).send(error);
      }

      // Si la búsqueda se realiza con éxito y no se encuentran resultados, envía un mensaje de "No se encontraron resultados".
      if (results.length === 0) {
        console.log('No se encontraron resultados');
        return res.send({
          message: 'No se encontraron resultados'
        });
      }

      // Si la búsqueda se realiza con éxito y hay resultados, se envían los resultados en la respuesta HTTP.
      //console.log('Resultados de la consulta SQL:', results);
      // La función pasa los resultados de la consulta a una función de callback (callback) proporcionada como argumento.
      callback(null, results);
      //envía los resultados de la consulta en la respuesta HTTP.
      return res.send({
        results: results
      });
    });
  } else {
    //let contra = fs.readFileSync('omitir/contras.txt', 'utf-8').trim();
    let partsql00 = "SELECT";
    let partsql01 = "`COD_CLI`,CONCAT(AES_DECRYPT(unhex(`D_N_I_`),  '" + contra + "'), `LETRANIF`) AS DNI,"; 
    let partsql02 = "CAST(AES_DECRYPT(unhex(`NO_CLI`),  '" + contra + "') AS CHAR) AS NOMBRE,";  
    let partsql03 = "CAST(AES_DECRYPT(unhex(`AP1_CLI`),  '" + contra + "') AS CHAR) AS APELL1,";  
    let partsql04 = "CAST(AES_DECRYPT(unhex(`AP2_CLI`),  '" + contra + "') AS CHAR) AS APELL2,`TEL_CLI`,REGEXP_REPLACE(`PERM_SOLIC`, '[^a-zA-Z0-9]', '') AS PERMISO,";  
    let partsql05 = "CAST(CONCAT(AES_DECRYPT(unhex(`NO_CLI`),  '" + contra + "'), ' ', AES_DECRYPT(unhex(`AP1_CLI`),  '" + contra + "'), ' ', AES_DECRYPT(unhex(`AP2_CLI`),  '" + contra + "')) AS CHAR) AS NOMCOMPLET,";  
    let partsql06 = "DATE_FORMAT(`NAT_CLI`, '%d/%m/%Y') AS FechBuscada,TIMESTAMPDIFF(YEAR, NAT_CLI, CURDATE()) AS EDAD,";  
    let partsql07 = "CAST(CONCAT(AES_DECRYPT(unhex(`DIR_CLI`),  '" + contra + "'), ' ', `NUM`, ' ', `PISO`, ' ', `LETRA`) AS CHAR) AS DIRCOMPLET";  
    let partsql08 = "FROM alumnos WHERE";
    let partsql09 = "`COD_CLI` LIKE ? OR "; 
    let partsql10 = "CAST(AES_DECRYPT(unhex(`NO_CLI`),  '" + contra + "') AS CHAR) LIKE ? OR "; 
    let partsql11 = "CAST(AES_DECRYPT(unhex(`AP1_CLI`),  '" + contra + "') AS CHAR) LIKE ? OR "; 
    let partsql12 = "CAST(AES_DECRYPT(unhex(`AP2_CLI`),  '" + contra + "') AS CHAR) LIKE ? OR "; 
    let partsql13 = "`TEL_CLI` LIKE ? OR "; 
    let partsql14 = "CAST(CONCAT(AES_DECRYPT(unhex(`NO_CLI`),  '" + contra + "'), ' ', AES_DECRYPT(unhex(`AP1_CLI`),  '" + contra + "'), ' ', AES_DECRYPT(unhex(`AP2_CLI`),  '" + contra + "')) AS CHAR) LIKE ? OR "; 
    let partsql15 = "DATE_FORMAT(`NAT_CLI`, '%d/%m/%Y') LIKE ? OR "; 
    let partsql16 = "CONCAT(AES_DECRYPT(unhex(`D_N_I_`),  '" + contra + "'), `LETRANIF`) LIKE ?"; 
    
    let sql = `${partsql00} ${partsql01} ${partsql02} ${partsql03} ${partsql04} ${partsql05} ${partsql06} ${partsql07} ${partsql08} ${partsql09} ${partsql10} ${partsql11} ${partsql12} ${partsql13} ${partsql14} ${partsql15} ${partsql16}`;

    // Realiza una consulta SQL que selecciona varios campos de la tabla "alumnos01" donde el COD_CLI, NO_CLI, AP1_CLI, AP2_CLI o la combinación del D_N_I_ y LETRANIF sean iguales a searchInput o contengan searchInput.
    conexion.query(sql, [`%${searchInput}%`, `%${searchInput}%`, `%${searchInput}%`, `%${searchInput}%`, `%${searchInput}%`, `%${searchInput}%`, `%${searchInput}%`, `%${searchInput}%`], (error, results) => {
      //console.log('SQL query results:', results);

      // Maneja los errores en la búsqueda
      if (error) {
        console.log('Error en la consulta SQL:', error);
        // Si ocurre un error, envía el error en la respuesta HTTP con un código de estado HTTP 500.
        return res.status(500).send(error);
      }

      // Si la búsqueda se realiza con éxito y no se encuentran resultados, envía un mensaje de "No se encontraron resultados".
      if (results.length === 0) {
        console.log('No se encontraron resultados');
        return res.send({
          message: 'No se encontraron resultados'
        });
      }

      // Si la búsqueda se realiza con éxito y hay resultados, se envían los resultados en la respuesta HTTP.
      //console.log('Resultados de la consulta SQL:', results);
      // La función pasa los resultados de la consulta a una función de callback (callback) proporcionada como argumento.
      callback(null, results);
      //envía los resultados de la consulta en la respuesta HTTP.
      return res.send({
        results: results
      });
    });
  }  
};


