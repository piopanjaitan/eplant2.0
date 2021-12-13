const _ = require('lodash')
const oracledb = require('oracledb')
const database = require('../../oradb/dbHandler')

const baseQuery = `  SELECT MODULE "module",
MODULENAME "modulename",
SUBMODULE "submodule",
SUBMODULENAME "title",
CLASSNAME "classname",
ICON "icon",
ROUTE "route",
PARAMETER1 "parameter1",
PARAMETER2 "parameter2",
PARAMETER3 "parameter3",
PARAMETER4 "parameter4",
TIPE "tipe",
SUM (isdetail) OVER (PARTITION BY MODULE)    "isdetail",
CASE
    WHEN TIPE = 'HEADER'
    THEN
        TO_CHAR (MODULE)
    WHEN TIPE = 'FOLDER'
    THEN
        TO_CHAR (MODULE) || PARAMETER1
    WHEN TIPE = 'FORM'
    THEN
        TO_CHAR (MODULE) || classname || TO_CHAR (SUBMODULE)
END "key",
CASE
    WHEN PARAMETER1 = 'C'
    THEN
        TO_CHAR (MODULE)
    WHEN TIPE = 'HEADER'
    THEN
        NULL
    WHEN TIPE = 'FOLDER'
    THEN
        TO_CHAR (MODULE)
    ELSE
        CASE
            WHEN SUM (isdetail) OVER (PARTITION BY MODULE) = 0
            THEN
                TO_CHAR (MODULE)
            ELSE
                CLASSNAME
        END
END "parent"
FROM (SELECT S.MODULE,
    M.NAME                                                MODULENAME,
    S.CODE                                                SUBMODULE,
    S.NAME                                                SUBMODULENAME,
    CLASSNAME,
    ICON,
    ROUTE,
    PARAMETER1,
    PARAMETER2,
    PARAMETER3,
    PARAMETER4,
    FORMNAME,
    0                                                     isdetail,
    CASE
        WHEN NVL (FORMNAME, '#') LIKE '%#%' THEN 'FOLDER'
        ELSE 'FORM'
    END                                                   TIPE,
    COUNT (*) OVER (PARTITION BY s.module, parameter1)    counts
FROM ACCESSRIGHTS A, SUBMODULE S, MODULE M
WHERE     A.LOGINID = :loginid
    AND A.MODULECODE = S.MODULE
    AND A.SUBMODULECODE = S.CODE
    AND S.MODULE = M.CODE
    AND A.AUTHORIZED = 'Y'
    AND S.PARAMETER1 NOT IN ('R')
UNION ALL
SELECT DISTINCT
      m.code          MODULE,
      m.name          MODULENAME,
      m.code          SUBMODULE,
      m.name          SUBMODULENAME,
      'H'             CLASSNAME,
      ''              ICON,
      ''              ROUTE,
      ''              PARAMETER1,
      ''              PARAMETER2,
      ''              PARAMETER3,
      ''              PARAMETER4,
      ''              FORMNAME,
      SUM (
          DISTINCT
              CASE
                  WHEN REGEXP_INSTR (s.classname, '[[:digit:]]') = 0
                  THEN
                      1
                  ELSE
                      0
              END)    isdetail,
      'HEADER'        TIPE,
      0               counts
 FROM module M, ACCESSRIGHTS A, submodule s
WHERE     A.LOGINID = :loginid
      AND A.AUTHORIZED = 'Y'
      AND m.code = s.module
      AND a.submodulecode = s.code
      AND A.MODULECODE = s.module
      AND formname = '#'
GROUP BY m.code, m.name
ORDER BY module)
WHERE MODULE IN (1, 11) AND NOT (tipe = 'FOLDER' AND COUNTS = 1)
ORDER BY MODULE,
PARAMETER1 DESC,
PARAMETER3,
SUBMODULE`




const fetchMenu = async function (users, callback) {


    let result



    binds = {}
    binds.loginid = users.loginid

    try {
        result = await database.siteExecute(users, baseQuery, binds)
    } catch (error) {
        callback(error, '')
    }


    callback('', result.rows)
}

module.exports = {
    fetchMenu
}