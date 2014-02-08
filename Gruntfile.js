module.exports = function(grunt){

    // 项目配置
	//grunt.file.defaultEncoding = 'gbk';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //合并任务
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            "jsCombo": {
                src: ['src/intro.js','src/One.js','src/*.js','src/outro.js'],
                dest: 'build/One.js'
            }
        },

        //压缩任务
        uglify:{
			options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				beautify: {
					ascii_only: true
				}
            },
			"jsCombo":{
					files:{"build/One-min.js":'build/One.js'}
			}
        },
        watch: {
			"js":{
				files: ["<%= concat.jsCombo.src  %>"],
				tasks: ['concat:jsCombo']
			},
			"livereload": {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'demo/*.html',
					'build/*.{css,js}'
				]
			}
        },
		
		
		imagemin: {                   
			dynamic: {			             // Another target
			  files: [{
				expand: true,                  // Enable dynamic expansion
				cwd: 'assets/slice/',                   // Src matches are relative to this path
				src: ['**/*.{png,gif}'],   // Actual patterns to match
				dest: 'assets/slice-min/'                  // Destination path prefix
			  }]
			}
		  },
  
         
		connect:{
            
            options: {
                port: 9000,
                livereload: 35729,
                hostname: '10.68.86.69'
            },
            
            livereload: {
                options: {
                    open: true,
                    base: [
                        ''
                    ]
                }
            }
        }

    });



    //合并插件
    grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	
    //上线 grunt 
    grunt.registerTask('dist', ['concat','uglify']);
	
	//windows 上这个任务有些问题
	//grunt.registerTask('image',['imagemin']);
	//grunt.registerTask('test',['uglify:test','uglify:jsCombo']);
    //开发 grunt dev
    grunt.registerTask('dev', ['connect:livereload','watch']);
}