module.exports = function(grunt) {
    var pluginPath = 'jquery.cattags/',
        pluginName = 'jquery.cattags';

    //配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Metadata.         
        meta: {
            srcPath: pluginPath,
            deployPath: pluginPath,
            deployName: pluginName,
            banner: '/*\n' +
                '*     <%= pkg.name %> - v<%= pkg.version %> - by <%= pkg.authors %> \n' +
                '*     <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '*     detail at: <%= pkg.url %>\n' +
                '*     Copyright (c) <%= grunt.template.today("yyyy") %> \n' +
                '*/\n'
        },

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors: true,
                    consolidateMediaQueries: true
                },
                files: {
                    '<%= meta.deployPath %><%= meta.deployName %>.css': '<%= meta.deployPath %><%= meta.deployName %>.css'
                }
            }
        },

        cssmin: {
            options: {
                banner: '<%= meta.banner %>'
            },
            build: {
                src: '<%= meta.deployPath %><%= meta.deployName %>.css',
                dest: '<%= meta.deployPath %><%= meta.deployName %>.min.css'
            }
        },

        sass: {
            build: {
                files: {
                    '<%= meta.deployPath %><%= meta.deployName %>.css': '<%= meta.srcPath %><%= meta.deployName %>.scss'
                }
            }
        },

        //连接
        concat: {
            options: {
                separator: ';' //separates scripts 
            },
            dist: {
                src: [
                    '<%= meta.srcPath %>requestAnimationFrame.js',
                    '<%= meta.srcPath %><%= meta.deployName %>.js'
                ],
                dest: '<%= meta.deployPath %><%= meta.deployName %>.c.js'
            }
        },
        // 压缩
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            bulid: {
                src: '<%= meta.deployPath %><%= meta.deployName %>.c.js',
                dest: '<%= meta.deployPath %><%= meta.deployName %>.min.js'
            }
        },
        // file changed watcher
        watch: {
            scripts: {
                files: [
                    '<%= meta.srcPath %><%= meta.deployName %>.js'
                ],
                tasks: ['buildjs']
            },
            sass: {
                files: [
                    '<%= meta.srcPath %><%= meta.deployName %>.scss'
                ],
                tasks: ['buildcss']
            }
        }
    });
    //scss的合并、压缩任务
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-cssc');

    //载入concat和uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-watch');

    //注册任务
    grunt.registerTask('default', []);
    grunt.registerTask('buildjs', ['concat', 'uglify']);
    grunt.registerTask('buildcss', ['sass', 'cssc', 'cssmin']);
};