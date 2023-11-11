const gulp = require('gulp')
    , fs = require('fs')
    , rename = require('gulp-rename')

    ;
/** Pasta raiz dos arquivos e pasta de destino onde será agrupado*/
const tsx_files_folder = './cb',
    dest_folder = './Carbon';
/**Agrega os icones */
let icons_component_list = [];
/** Script para agrupar os icones */
gulp.task('icons_components', function () {
    return gulp.src([
        tsx_files_folder + '/*.tsx'
    ])
        .pipe(rename(function (path) {
            icons_component_list.push(path.basename);
            path.extname = '.jsx';
        }))
});
/**Script dos arquivos já agrupados */
gulp.task('icons_component_main', function (cb) {

    return fs.writeFile(dest_folder + '/CbIcons.jsx',
        '/* GENERATED FILE */\n\n' +
        icons_component_list.map(item => {

            let module_name = (item.charAt(0).toUpperCase() + item.substr(1))
                .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

            return `export { default as ${module_name} } from '../cb/${item}';`;
        }).join('\n'),
        cb);
});
/** Ordem de como será tratado o script */
gulp.task('default',
    gulp.series(
        'icons_components',
        'icons_component_main',
    )
);