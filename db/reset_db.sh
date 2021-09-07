#!/bin/sh
dropdb passport-test
createdb passport-test
psql passport-test <./setup.sql