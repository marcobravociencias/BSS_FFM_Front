package com.mx.totalplay.ffm.cloudweb.utilerias.utils;

import java.io.File;
import java.text.NumberFormat;

public class SystemInfo {
	 private static Runtime runtime = Runtime.getRuntime();
	 
	 public static String info;
	 

	    public static  void Info() {
	        StringBuilder sb = new StringBuilder();
	        sb.append(OsInfo());
	        sb.append(MemInfo());
	        sb.append(DiskInfo());
	        info= sb.toString();
	    }

	    public static String OSname() {
	        return System.getProperty("os.name");
	    }

	    public static String OSversion() {
	        return System.getProperty("os.version");
	    }

	    public static String OsArch() {
	        return System.getProperty("os.arch");
	    }

	    public static long totalMem() {
	        return Runtime.getRuntime().totalMemory();
	    }

	    public static long usedMem() {
	        return Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
	    }

	    public static String MemInfo() {
	        NumberFormat format = NumberFormat.getInstance();
	        StringBuilder sb = new StringBuilder();
	        long maxMemory = runtime.maxMemory();
	        long allocatedMemory = runtime.totalMemory();
	        long freeMemory = runtime.freeMemory();
	        sb.append("Free memory: ");
	        sb.append(format.format(freeMemory / 1024));
	        sb.append("<br/>");
	        sb.append("Allocated memory: ");
	        sb.append(format.format(allocatedMemory / 1024));
	        sb.append("<br/>");
	        sb.append("Max memory: ");
	        sb.append(format.format(maxMemory / 1024));
	        sb.append("<br/>");
	        sb.append("Total free memory: ");
	        sb.append(format.format((freeMemory + (maxMemory - allocatedMemory)) / 1024));
	        sb.append("<br/>");
	        return sb.toString();

	    }

	    public static String OsInfo() {
	        StringBuilder sb = new StringBuilder();
	        sb.append("OS: ");
	        sb.append(OSname());
	        sb.append("<br/>");
	        sb.append("Version: ");
	        sb.append(OSversion());
	        sb.append("<br/>");
	        sb.append(": ");
	        sb.append(OsArch());
	        sb.append("<br/>");
	        sb.append("Available processors (cores): ");
	        sb.append(runtime.availableProcessors());
	        sb.append("<br/>");
	        return sb.toString();
	    }

	    public static String DiskInfo() {
	        /* Get a list of all filesystem roots on this system */
	        File[] roots = File.listRoots();
	        StringBuilder sb = new StringBuilder();

	        /* For each filesystem root, print some info */
	        for (File root : roots) {
	            sb.append("File system root: ");
	            sb.append(root.getAbsolutePath());
	            sb.append("<br/>");
	            sb.append("Total space (bytes): ");
	            sb.append(root.getTotalSpace());
	            sb.append("<br/>");
	            sb.append("Free space (bytes): ");
	            sb.append(root.getFreeSpace());
	            sb.append("<br/>");
	            sb.append("Usable space (bytes): ");
	            sb.append(root.getUsableSpace());
	            sb.append("<br/>");
	        }
	        return sb.toString();
	    }
}
