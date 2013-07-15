from __future__ import with_statement
from fabric.api import *
from fabric.contrib.files import exists


env.use_ssh_config = True
env.hosts = ['seal']
REPO = 'git@bitbucket.org:sapegin/birdwatcher.git'
DEST = 'sites/beta.birdwatcher.ru'


@task(default=True)
def deploy():
	with cd(DEST):
		run('git checkout master')
		run('git pull')
